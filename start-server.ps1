# PowerShell HTTP 서버 스크립트
$port = 8000
$root = Get-Location

Write-Host "HTTP 서버 시작 중..." -ForegroundColor Green
Write-Host "포트: $port" -ForegroundColor Yellow
Write-Host "루트 디렉토리: $root" -ForegroundColor Yellow
Write-Host "브라우저에서 http://localhost:$port 으로 접속하세요" -ForegroundColor Cyan
Write-Host "서버를 중지하려면 Ctrl+C를 누르세요" -ForegroundColor Red
Write-Host ""

try {
    $listener = New-Object System.Net.HttpListener
    $listener.Prefixes.Add("http://localhost:$port/")
    $listener.Start()
    
    Write-Host "서버가 시작되었습니다!" -ForegroundColor Green
    
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        
        $localPath = $request.Url.LocalPath
        $filePath = Join-Path $root $localPath.TrimStart('/')
        
        if ($localPath -eq "/" -or $localPath -eq "") {
            $filePath = Join-Path $root "index.html"
        }
        
        Write-Host "$($request.HttpMethod) $localPath" -ForegroundColor White
        
        if (Test-Path $filePath -PathType Leaf) {
            $content = Get-Content $filePath -Raw -Encoding UTF8
            $buffer = [System.Text.Encoding]::UTF8.GetBytes($content)
            
            # MIME 타입 설정
            $extension = [System.IO.Path]::GetExtension($filePath)
            switch ($extension) {
                ".html" { $response.ContentType = "text/html; charset=utf-8" }
                ".css"  { $response.ContentType = "text/css; charset=utf-8" }
                ".js"   { $response.ContentType = "application/javascript; charset=utf-8" }
                ".png"  { $response.ContentType = "image/png" }
                ".jpg"  { $response.ContentType = "image/jpeg" }
                ".jpeg" { $response.ContentType = "image/jpeg" }
                ".gif"  { $response.ContentType = "image/gif" }
                default { $response.ContentType = "text/plain; charset=utf-8" }
            }
            
            $response.ContentLength64 = $buffer.Length
            $response.OutputStream.Write($buffer, 0, $buffer.Length)
        } else {
            $response.StatusCode = 404
            $notFound = "<html><body><h1>404 - 파일을 찾을 수 없습니다</h1><p>요청된 파일: $localPath</p></body></html>"
            $buffer = [System.Text.Encoding]::UTF8.GetBytes($notFound)
            $response.ContentType = "text/html; charset=utf-8"
            $response.ContentLength64 = $buffer.Length
            $response.OutputStream.Write($buffer, 0, $buffer.Length)
        }
        
        $response.Close()
    }
} catch {
    Write-Host "오류 발생: $_" -ForegroundColor Red
} finally {
    if ($listener) {
        $listener.Stop()
        Write-Host "서버가 중지되었습니다." -ForegroundColor Yellow
    }
}
