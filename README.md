Lab
* material ui
* react-router-dom

1. Custom pagination
2. Meterial pagination

* WebRTC

NAT (Network Address Translation)
- 如果有 expot IP public address 那就沒問題，那別人就能直接通過你的 public address和你connection
- 但是 事實上 大多數人都在NAT後面，只要電腦 connected WIFI or lan (router), 所以你不會有public address 只有 router有

Mac IP: 10.0.0.2
Router Private IP: 10.0.0.1
Router Public IP: 5.5.5.5
Another Mac IP: 4.4.4.4:80

NAT：
1. 當自己的Mac IP 要connected Another Mac IP， 它會檢查 對方是不是 自己的subnet， 返回不是 因為 自己的Priate IP是 10.0.0 對方開頭是4.4.4 （這時沒有經過router，純粹是 mac 自己的ip 嘗試和 另外一個 mac connected）
2. 過後 發現 connected不到，自己的mac ip 就會 call gateway(router) 幫忙
3. router 有 你自己的 mac private IP 和 對方的 IP(因為 你send給 router了)， 但是 我們不能讓自己的private IP 去到外面 太危險了
4. router 會 用 router 他自己的 public ip 去和 對方 make connection
5. 在這之前 router會 craete 一個 **NAT Table** 如下圖: Internal/Ext Port 第一個 是 自己的mac的資料 第二個是router的 和你想要 connected對方的 資料

+-------------+---------------+-------------+----------+---------+-----------+
| Internal IP | Internal Port | External IP | Ext.Port | Dest IP | Dest Port |
+-------------+---------------+-------------+----------+---------+-----------+
| 10.0.0.2    | 8992          | 5.5.5.5     | 3333     | 4.4.4.4 | 80        |
+-------------+---------------+-------------+----------+---------+-----------+

6. router 過後會用 Ext.Port & External IP 去 對方的 4.4.4.4：80
7. 對方的就會 respond 200 OK, 如： Dest Port & Dest Ip send回去 External IP & Ext.Port
8. router 就會收到 Dest Port & Dest Ip send回去 External IP & Ext.Port
9. router 會去 NAT Table 看 誰的 External IP 是 5.5.5.5 和 3333， 過後 他就會看到 是 10.0.0.2 IP 和 8992 PORT
10. router 就會 forward 對方的 Dest IP和Dest Port 去 你的 Internal IP


NAT Translation Method 有4個type
1. One to One NAT (Full-cone NAT)
2. Address restricted NAT
3. Port restricted NAT
4. Symmetric NAT

WebRTC work default 3 type of NAT (大多數的 communication 這3個就夠了)
1. One to One NAT (Full-cone NAT)
2. Address restricted NAT
3. Port restricted NAT

**One to One NAT (Full-cone NAT)**
1. 只要有人 send 去這 External IP & Ext.PORT (5.5.5.5 & 3333)
2. Router 就會 看 有沒有 它的 NAT Table; 如下圖有沒有 5.5.5.5 & 3333
3. 有的話 他不管 是誰 都會讓 對方 通過
4. 你的 電腦 就會 收到 對方的 Dest IP & Dest Port
5. Note： 它不會去管 對方的 **Dest IP** 是不是 相同 也讓對方通過
6. 這樣做 有點 不 security 所以 Address restricted NAT come in。

**這是 router的 NAT Table**

+-------------+---------------+-------------+----------+---------+-----------+
| Internal IP | Internal Port | External IP | Ext.Port | Dest IP | Dest Port |
+-------------+---------------+-------------+----------+---------+-----------+
| 10.0.0.2    | 8992          | 5.5.5.5     | 3333     | 4.4.4.4 | 80        |
+-------------+---------------+-------------+----------+---------+-----------+
| 10.0.0.2    | 9999          | 5.5.5.5     | 4444     | 3.3.3.3 | 80        |
+-------------+---------------+-------------+----------+---------+-----------+

**這個是 別人send 去 我們 router的 資料** Status 200 ok 是 對方 決定 返國我們之前 去 對方 ip的 respond

+-----------+---------+----------+-------------+----------+
| Dest Port | Dest IP | Status   | External IP | Ext.Port |
+-----------+---------+----------+-------------+----------+
| 80        | 4.4.4.4 | 200 (Ok) | 5.5.5.5     | 3333     |
+-----------+---------+----------+-------------+----------+
| 8080      | 3.3.3.3 | 200 (Ok) | 5.5.5.5     | 3333     |
+-----------+---------+----------+-------------+----------+
| 23        | 9.8.1.2 | 200 (Ok) | 5.5.5.5     | 3333     |
+-----------+---------+----------+-------------+----------+

**Address restricted NAT**
1. Router 會去 檢查NAT Table裡的 Dest IP 是不是 相同的
2. 是的話 就會 讓你 通過， 因為 這代表 之前 我trust你過，所以fireware 會讓你 進來
3. Note: router 只會去檢查 **Dest IP** 是不是 在 NAT Table， 是的話 就會通過
4. 要更加 strict 那就是 Port restricted NAT come in了

**Port restricted NAT**
1. router 會檢查 Dest IP & Dest Port
2. 如果都符合 NAT Table 裡面， 他才會 send去 Internal IP


**Symmetric NAT**
1.

STUN, TURN
ICE
SDP


