import React, { useEffect } from "react";
import "./home.css";
import { Button, Button2 } from "./components/button.components";
import { RiTwitterXFill } from "react-icons/ri";
import Message from "./components/chat";
import { avatars, fakePosts } from "./context/data";

export function App() {
  const [posts, setPosts] = React.useState(fakePosts);
  const [postText, setPostText] = React.useState("");
  const info = JSON.parse(localStorage.getItem("user-info"));
  const [token_prices, setToken_prices] = React.useState([]);
  const [userInfo, setUserInfo] = React.useState(
    info?.username
      ? info
      : {
          username: "",
          avatar: 0,
        }
  );

  const handlePost = (newPost) => {
    if (newPost.trim() === "") return;
    const newPostData = {
      user: "You",
      text: newPost,
      image: null,
      likes: 0,
      comments: 0,
      timestamp: "Just now",
    };
    setPosts([newPostData, ...posts]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setPosts((prevPosts) => {
        const newPost = {
          user: prevPosts[Math.floor(Math.random() * prevPosts.length)].user,
          text: prevPosts[Math.floor(Math.random() * prevPosts.length)].text,
          image: prevPosts[Math.floor(Math.random() * prevPosts.length)].image,
          likes: Math.floor(Math.random() * 100),
          comments: Math.floor(Math.random() * 50),
          timestamp: "Just now",
        };
        return [newPost, ...prevPosts];
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const createProfile = () => {
    if (userInfo.username.trim() === "") {
      alert("Please enter a username");
      return;
    }
    localStorage.setItem("user-info", JSON.stringify(userInfo));
    window.location.reload();
  };
  //sol,btc,eth,xrp
  useEffect(() => {
    const fetchTokens = async () => {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=solana,bitcoin,ethereum,ripple,dogecoin&order=market_cap_desc&per_page=10&page=1&sparkline=false",
      );
      const data = await res.json();
      const prices = data.map((token) => ({
        name: token.name,
        symbol: token.symbol,
        price: token.current_price,
        change: token.price_change_percentage_24h,
      }));
      setToken_prices(prices);
    };
    fetchTokens();
  }, []);

  console.log(token_prices);
  

  return (
    <div className="app-wrapper">
      <aside className="sidebar">
        <div className="df fdc gap-10 profile">
          <h1>My Profile</h1>
          <div className="avatar">
            <img
              src={
                userInfo.avatar !== null
                  ? avatars[userInfo.avatar].src
                  : "https://via.placeholder.com/150"
              }
              alt="Avatar"
            />
          </div>
          <div className="username">info?.username</div>
        </div>
        <div className="friends">
          <h3>Users Online</h3>
          <ul className="df fdc gap-20 fs-18">
            <li className="df aic gap-10">
              <b>FO</b>
              <p className="df fdc gap-5">
                <span>Fooopacbleguy</span>
              </p>
            </li>
            <li className="df aic gap-10">
              <b>RD</b>
              <p className="df fdc gap-5">
                <span>Rugpull Destroyer</span>
              </p>
            </li>
            <li className="df aic gap-10">
              <b>FR</b>
              <p className="df fdc gap-5">
                <span>Foobar</span>
              </p>
            </li>
            <li className="df aic gap-10">
              <b>OB</b>
              <p className="df fdc gap-5">
                <span>Orio Baggins</span>
              </p>
            </li>
            <Button2>See more</Button2>
          </ul>
        </div>
        <div className="hot-tokens mt-20">
          <h3>Hot Tokens</h3>
          <ul className="df fdc gap-10 fs-18 mt-10">
            {token_prices.map((token) => (
              <li key={token.symbol}>
                {token.name} —{" "}
                <span
                  style={{
                    color:
                      token.change > 0
                        ? "var(--highlight-green)"
                        : "var(--highlight-red)",
                  }}
                >
                  ${token.price.toFixed(2)} ({token.change.toFixed(2)}%)
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="w100 df mt-20">
          <Button>
            Follow Us <RiTwitterXFill />
          </Button>
        </div>
      </aside>
      {/* Right Panel */}
      <header className="right-panel df fdc gap-20">
        <div className="df fdc gap-10 mt-20">
          <h3>Solana Launchpads & DEXs</h3>
          <marquee behavior="smooth" direction="row">
            <div className="df aic gap-10">
              <p>Pump.fun</p>
              <p>Bonk</p>
              <p>Believe</p>
            </div>
          </marquee>
        </div>

        <div className="df fdc gap-10 mt-20">
          <h3>Trending</h3>
          <marquee behavior="smooth" direction="row">
            <div className="df aic gap-10">
              <p>#MOONDOG</p>
              <p>#PIZZACOIN</p>
              <p>#MOONPIG</p>
              <p>#SOGE</p>
              <p>#FARTCAT</p>
              <p>#RUN</p>
              <p>#KING</p>
              <p>#GIB</p>
              <p>#MOONELON</p>
              <p>#PHDKITTY</p>
              <p>#BORPA</p>
              <p>#BASILISK</p>
            </div>
          </marquee>
        </div>

        <div className="degen-chat"></div>
      </header>

      {/* Main Feed */}
      <main className="feed">
        <h1 className="feed-title">Degen Feed</h1>
        <textarea
          placeholder="What's on your mind?"
          onChange={(e) => setPostText(e.target.value)}
        ></textarea>
        <Button onClick={() => handlePost(postText)}>Post</Button>

        {posts.map((post, index) => (
          <div className="post" key={index}>
            <div className="post-user">{post.user}</div>
            <p>{post.text}</p>
            {post.image && <img src={post.image} alt="Post" />}
            <div className="w100 df aic jcsb post-actions">
              <span>
                💬 {post.comments} 👍 {post.likes.toString().slice(0, 1)}
              </span>
              <small>{post.timestamp}</small>
            </div>
          </div>
        ))}
      </main>

      <Message />

      <div
        className={`df fdc aic modal ${userInfo?.username === "" && "open"}`}
      >
        <div className="df fdc aic gap-20 modal-content">
          <h1>Create your Profile</h1>
          <div className="df fdc gap-10 ">
            <input
              type="text"
              placeholder="Username"
              value={userInfo.username}
              onChange={(e) =>
                setUserInfo({ ...userInfo, username: e.target.value })
              }
            />
            <div className="avatars">
              {avatars.map((avatar) => (
                <div
                  className={`avatar ${
                    userInfo.avatar === avatar.id && "active"
                  }`}
                  key={avatar.id}
                  onClick={() => {
                    setUserInfo({ ...userInfo, avatar: avatar.id });
                  }}
                >
                  <img src={avatar.src} alt="Avatar" />
                </div>
              ))}
            </div>
            <div className="df aic jcsb">
              <Button2 onClick={createProfile}>Submit</Button2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
