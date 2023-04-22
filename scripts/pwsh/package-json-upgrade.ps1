
# upgrades all packages in package json under $keyToUpgrade
# $keyToUpgrade = 'dependencies'
$keyToUpgrade = 'devDependencies'
$keysWithFiller = Get-Content .\package.json | jq  ".$keyToUpgrade | keys" | ForEach-Object {$_ -match '[a-z]*[\-]*[a-z]*' ? $_ -replace '(\[|\]|\{|\}|\,|\"|`n)*','' : ''}   
$keys = $keysWithFiller | Where-Object { $_ } | Select -Unique     
$latest = $keys | ForEach-Object {"$_@latest"} 
npm i -D $latest.Trim() -join " "  