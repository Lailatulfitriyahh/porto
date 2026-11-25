<?php
/**
 * api/get_certificates.php
 * Endpoint untuk memindai dan membaca file sertifikat secara dinamis
 * berdasarkan folder institusi pendidikan (SMK & Universitas).
 * Tanpa database & tanpa CRUD manual.
 */

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-cache, no-store, must-revalidate');
header('Pragma: no-cache');
header('Expires: 0');

// Ambil parameter institusi ('smk' atau 'univ')
$institution = isset($_GET['institution']) ? strtolower(trim($_GET['institution'])) : '';
if (!in_array($institution, ['smk', 'univ'], true)) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Institusi tidak valid. Pilih "smk" atau "univ".',
        'count' => 0,
        'certificates' => []
    ]);
    exit;
}

$baseDir = dirname(__DIR__);
$cleanBase = rtrim(str_replace('\\', '/', $baseDir), '/');

// Folder resmi sertifikat (tunggal & terstruktur rapi per institusi)
$possibleFolders = [
    $cleanBase . '/assets/certificates/' . $institution,
];

// Ekstensi yang diizinkan (PDF & format Gambar)
$allowedExtensions = ['pdf', 'jpg', 'jpeg', 'png', 'webp', 'svg'];
$ignoredFiles = ['.gitkeep', '.ds_store', 'thumbs.db', 'readme.txt', 'index.php', 'index.html'];

$foundFiles = [];
$processedNames = [];

foreach ($possibleFolders as $folderPath) {
    if (!is_dir($folderPath)) {
        continue;
    }

    $items = @scandir($folderPath);
    if ($items === false) {
        continue;
    }

    $cleanFolder = rtrim(str_replace('\\', '/', $folderPath), '/');
    $relativeDir = ltrim(str_replace($cleanBase, '', $cleanFolder), '/');

    foreach ($items as $item) {
        if ($item === '.' || $item === '..' || str_starts_with($item, '.')) {
            continue;
        }

        $itemLower = strtolower($item);
        if (in_array($itemLower, $ignoredFiles, true)) {
            continue;
        }

        $filePath = $folderPath . '/' . $item;
        if (!is_file($filePath)) {
            continue;
        }

        $ext = strtolower(pathinfo($item, PATHINFO_EXTENSION));
        if (!in_array($ext, $allowedExtensions, true)) {
            continue;
        }

        // Jika membaca folder root, pastikan nama file ada indikasi institusi terkait
        $isSubFolder = str_ends_with($cleanFolder, '/' . $institution);
        if (!$isSubFolder) {
            $isMatch = ($institution === 'smk' && (str_contains($itemLower, 'smk') || str_contains($itemLower, 'sekolah'))) ||
                       ($institution === 'univ' && (str_contains($itemLower, 'univ') || str_contains($itemLower, 'kuliah') || str_contains($itemLower, 'kampus')));
            if (!$isMatch) {
                continue;
            }
        }

        // Hindari duplikasi jika ada di beberapa folder
        if (isset($processedNames[$itemLower])) {
            continue;
        }
        $processedNames[$itemLower] = true;

        // Path relatif untuk web URL yang akurat
        $relativeWebPath = $relativeDir . '/' . rawurlencode($item);

        // Gunakan nama file apa adanya (tanpa reformatting)
        $rawName = pathinfo($item, PATHINFO_FILENAME);
        $cleanTitle = trim($rawName);

        // Format ukuran file
        $bytes = @filesize($filePath) ?: 0;
        if ($bytes >= 1048576) {
            $formattedSize = number_format($bytes / 1048576, 1) . ' MB';
        } elseif ($bytes >= 1024) {
            $formattedSize = number_format($bytes / 1024, 0) . ' KB';
        } else {
            $formattedSize = $bytes . ' B';
        }

        // Ambil tahun modifikasi file jika tidak ada di nama
        $fileMtime = @filemtime($filePath) ?: time();
        $year = date('Y', $fileMtime);
        if (preg_match('/\b(20\d\d)\b/', $rawName, $matches)) {
            $year = $matches[1];
        }

        $foundFiles[] = [
            'id' => md5($item),
            'filename' => $item,
            'title' => $cleanTitle,
            'ext' => $ext,
            'isPdf' => ($ext === 'pdf'),
            'isImage' => in_array($ext, ['jpg', 'jpeg', 'png', 'webp', 'svg'], true),
            'url' => $relativeWebPath,
            'size' => $formattedSize,
            'year' => $year,
            'mtime' => $fileMtime,
        ];
    }
}

// Urutkan sertifikat: file terbaru berdasarkan waktu modifikasi / tahun
usort($foundFiles, function ($a, $b) {
    return $b['mtime'] <=> $a['mtime'];
});

// Batasi maksimal 10 sertifikat per institusi sesuai ketentuan
$limitedCertificates = array_slice($foundFiles, 0, 10);

echo json_encode([
    'status' => 'success',
    'institution' => $institution,
    'total_in_folder' => count($foundFiles),
    'count' => count($limitedCertificates),
    'max_reached' => (count($foundFiles) >= 10),
    'certificates' => $limitedCertificates
], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
