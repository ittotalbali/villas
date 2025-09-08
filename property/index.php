<?php
echo "Hello World from PHP at /property/index.php!<br>";
$slug = isset($_GET['slug']) ? $_GET['slug'] : 'direct access';
echo "Accessed as: " . htmlspecialchars($slug);
if ($slug !== 'direct access') {
    echo "<br>Rewrite worked via property/.htaccess!";
}
?>