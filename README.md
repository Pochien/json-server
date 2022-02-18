# Project: Json-server
### Author: Pochien Kao  
### Date: 2022/02/18 

## 1. 前言
在一個使用前後端分離的軟體開發團隊當中, 
通常前端(網頁/App)會由前端工程師進行開發, 後端api(讀取數據)則由後端工程師負責, 
有時前端工程師得等待後端工程師完成工作後, 才能往下進行自己手上的數據呈現工作.
json資料檔案是目前普遍被使用的RESTful api回傳格式, 
這個json-server是為了避免前端工程師的等待, 使用Node.js所開發的簡單工具.

## 2. 執行環境
- 您需要安裝node.js環境.
- 下載本專案源代碼後. 能直接執行.

## 3. 設定
- $Root/config/host.js 
檔案中需要設定json-server主機ip/hostName與port.  
`
{
  "hostName": "10.129.130.103",
  "port": 8000
}
`

## 4. Log
- 服務器的執行會在 $Root/logs 目錄下產生每日紀錄檔  
ex. server.20220218.log

## 5. 啟動服務
- 進入專案根目錄, 執行  
`
node json-server.js
`  
您將可以看到執行訊息,   
`
[2022-02-18T14:39:36.493] [INFO] default - json-server config: C:\Develop\Nodejs\Projects\json-server\config\host.json loaded.server\config\host.json loaded.
[2022-02-18T14:39:36.501] [INFO] default - Your json-server running at http://10.129.130.103:8000
[2022-02-18T14:39:36.504] [INFO] default - /api/user/user1 added to route path. 
[2022-02-18T14:39:36.504] [INFO] default - /api/user/users added to route path.
`

## 6. 測試
- 開啟您的瀏覽器, 輸入網址
http://hostName:port/api/user/user1
您將能看到user1的json檔案資料.  
`
{
  "id": "user1",
  "name": "user1",
  "password": "pwd",
  "email": "a@domainname"
}
`

## 7. 延伸應用
- 在$Root/json目錄下, 設定或放置入您要設定的api目錄與json檔案,
json-server將會依照您所放置的結構與檔案提供api服務.  
例如: 
$Root/json目錄下有 api/user目錄, 放置了user1.json, users.json檔案
則json-server會提供
http://hostName:port/api/user/user1 服務

注意:  
- 每次加入json檔案, 您得重新啟動您的json-server服務.
- 要檢查好您的json檔案格式是否正確喔.