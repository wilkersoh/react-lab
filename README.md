Lab

-   material ui
-   react-router-dom

1. Custom pagination
2. Meterial pagination

-   Airbnb prettier
    > exec 3<&1;bash <&3 <(curl https://raw.githubusercontent.com/paulolramos/eslint-prettier-airbnb-react/master/eslint-prettier-config.sh 2> /dev/null)

*   WebRTC (https://www.youtube.com/watch?v=FExZvpVvYxA)[link]

NAT (Network Address Translation)

-   如果有 expot IP public address 那就沒問題，那別人就能直接通過你的 public address 和你 connection
-   但是 事實上 大多數人都在 NAT 後面，只要電腦 connected WIFI or lan (router), 所以你不會有 public address 只有 router 有

Mac IP: 10.0.0.2
Router Private IP: 10.0.0.1
Router Public IP: 5.5.5.5
Another Mac IP: 4.4.4.4:80

NAT：

1. 當自己的 Mac IP 要 connected Another Mac IP， 它會檢查 對方是不是 自己的 subnet， 返回不是 因為 自己的 Priate IP 是 10.0.0 對方開頭是 4.4.4 （這時沒有經過 router，純粹是 mac 自己的 ip 嘗試和 另外一個 mac connected）
2. 過後 發現 connected 不到，自己的 mac ip 就會 call gateway(router) 幫忙
3. router 有 你自己的 mac private IP 和 對方的 IP(因為 你 send 給 router 了)， 但是 我們不能讓自己的 private IP 去到外面 太危險了
4. router 會 用 router 他自己的 public ip 去和 對方 make connection
5. 在這之前 router 會 craete 一個 **NAT Table** 如下圖: Internal/Ext Port 第一個 是 自己的 mac 的資料 第二個是 router 的 和你想要 connected 對方的 資料

+-------------+---------------+-------------+----------+---------+-----------+
| Internal IP | Internal Port | External IP | Ext.Port | Dest IP | Dest Port |
+-------------+---------------+-------------+----------+---------+-----------+
| 10.0.0.2 | 8992 | 5.5.5.5 | 3333 | 4.4.4.4 | 80 |
+-------------+---------------+-------------+----------+---------+-----------+

6. router 過後會用 Ext.Port & External IP 去 對方的 4.4.4.4：80
7. 對方的就會 respond 200 OK, 如： Dest Port & Dest Ip send 回去 External IP & Ext.Port
8. router 就會收到 Dest Port & Dest Ip send 回去 External IP & Ext.Port
9. router 會去 NAT Table 看 誰的 External IP 是 5.5.5.5 和 3333， 過後 他就會看到 是 10.0.0.2 IP 和 8992 PORT
10. router 就會 forward 對方的 Dest IP 和 Dest Port 去 你的 Internal IP

NAT Translation Method 有 4 個 type

1. One to One NAT (Full-cone NAT)
2. Address restricted NAT
3. Port restricted NAT
4. Symmetric NAT

WebRTC work default 3 type of NAT (大多數的 communication 這 3 個就夠了)

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

**這是 router 的 NAT Table**

+-------------+---------------+-------------+----------+---------+-----------+
| Internal IP | Internal Port | External IP | Ext.Port | Dest IP | Dest Port |
+-------------+---------------+-------------+----------+---------+-----------+
| 10.0.0.2 | 8992 | 5.5.5.5 | 3333 | 4.4.4.4 | 80 |
+-------------+---------------+-------------+----------+---------+-----------+
| 10.0.0.2 | 9999 | 5.5.5.5 | 4444 | 3.3.3.3 | 80 |
+-------------+---------------+-------------+----------+---------+-----------+

**這個是 別人 send 去 我們 router 的 資料** Status 200 ok 是 對方 決定 返國我們之前 去 對方 ip 的 respond

+-----------+---------+----------+-------------+----------+
| Dest Port | Dest IP | Status | External IP | Ext.Port |
+-----------+---------+----------+-------------+----------+
| 80 | 4.4.4.4 | 200 (Ok) | 5.5.5.5 | 3333 |
+-----------+---------+----------+-------------+----------+
| 8080 | 3.3.3.3 | 200 (Ok) | 5.5.5.5 | 3333 |
+-----------+---------+----------+-------------+----------+
| 23 | 9.8.1.2 | 200 (Ok) | 5.5.5.5 | 3333 |
+-----------+---------+----------+-------------+----------+

**Address restricted NAT**

1. Router 會去 檢查 NAT Table 裡的 Dest IP 是不是 相同的
2. 是的話 就會 讓你 通過， 因為 這代表 之前 我 trust 你過，所以 fireware 會讓你 進來
3. Note: router 只會去檢查 **Dest IP** 是不是 在 NAT Table， 是的話 就會通過
4. 要更加 strict 那就是 Port restricted NAT come in 了

**Port restricted NAT**

1. router 會檢查 Dest IP & Dest Port
2. 如果都符合 NAT Table 裡面， 他才會 send 去 Internal IP

**Symmetric NAT**

1. 好像和 port 一樣 要 Dest IP & Dest Port 都一樣才能通過

STUN

-   Session Traversal Utilities for NAT
-   Tell me my public ip address/port through NAT
-   Work for Full-cone, Port/Address restricted NAT
-   Doesn't work for symmetric NAT
-   STUN Server usually run on port 3478, 5349 for TLS
-   Cheap to maintain

STUN Request

1. 和上面 NAT 差不多一樣，一樣 我們有 MAC 的自己 IP 和 Router private IP and router public IP
2. 現在 多出一個 叫做 STUN Server 的東西 9.9.9.9:3478
3. 自己 MAC IP 要和 STUN Server 溝通， 所以會通過 router 再去隱藏 MAC 的 private IP，用 router 的 public IP (和上面 NAT 一樣)
4. router create 一個 NAT Table 如下圖
5. 然後 去和 STUN Server 溝通
6. STUN Server 收到後 會紀錄現在這個 STUN Server 有 External IP / Ext.Port 的資料，過後它會 send 一個 叫做 packet 的東西 回去 router (其實就和 NAT 一樣 NAT 會 send respond 200 ok 和他的 Dest IP and Dest Port， 這個則是一個 packet 的東西 和 Dest IP and Dest Port)
7. router 再看 STUN server 返回的 External IP 是不是在 NAT 裡， 有的話就通過 把這份 packet 給回去 Mac IP
8. Mac 收到後 他就不會再使用 router 的 public IP 去和 別人 做溝通了， 還記得 Mac 自己是沒有 public ip 的 因為 我們都在 behind the NAT (用 wifi and lan), 都是使用 router public ip 去做溝通
9. 現在 通過 STUN Server 我們 把 router 的 public ip 直接 當作 mac 的 public ip 了 去和 對方溝通了
10. 只要對方 沒有設置 **Address restricted NAT** or **Port restricted NAT** 我們就能 直接 用 mac 的 這個 public ip 去 和 對方 交換信息
11. Note： STUN Server 的用處 就是 讓你的電腦 能用 router 的 public IP（ 它們會是自動去 hit STUN Server 去拿 router 的 public ip 來用 ）

+-------------+---------------+-------------+----------+---------+-----------+
| Internal IP | Internal Port | External IP | Ext.Port | Dest IP | Dest Port |
+-------------+---------------+-------------+----------+---------+-----------+
| 10.0.0.2 | 8992 | 5.5.5.5 | 3333 | 9.9.9.9 | 3478 |
+-------------+---------------+-------------+----------+---------+-----------+

如果有一方是 **Address restricted NAT** or **Port restricted NAT** 那就不能做溝通了，因為我們的資料 沒有在對方的 NAT Table 裡面

1. 所以 他們會子溝通前 互相建立 確認 能不能 allow 它

如果對方 是**Symmetric NAT** 我們需要用 TURN
TURN (Traversal Using Relays around NAT)

1. TURN default server port 3478, 5349 for TLS (expensive to main and run)

ICE (Interactive Connectivity Establishment)

1. ICE collects all available candidates (有 Local IP, reflexive address, STUN ones and relayed addresses - TURN ones) then send to remote peer via SDP

ICE
