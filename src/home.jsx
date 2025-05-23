import React, { useEffect } from "react";
import "./home.css";
import { Button, Button2 } from "./components/button.components";
import { RiTwitterXFill } from "react-icons/ri";
import Message from "./components/chat";
import { fakePosts } from "./context/data";

export function App() {
  const [posts, setPosts] = React.useState(fakePosts);
  const [postText, setPostText] = React.useState("");

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

  return (
    <div className="app-wrapper">
      <aside className="sidebar">
        <div className="df fdc gap-10 profile">
          <h1>My Profile</h1>
          <div className="avatar">😎</div>
          <div className="username">zauzyad</div>
        </div>
        <div className="friends">
          <h3>Friends Online</h3>
          <ul className="df fdc gap-20 fs-18">
            <li className="df aic gap-10">
              <b>FO</b>
              <p className="df fdc gap-5">
                <span>Fooopacbleguy</span>
                <small>last seen: 10m ago</small>
              </p>
            </li>
            <li className="df aic gap-10">
              <b>RD</b>
              <p className="df fdc gap-5">
                <span>Rugpull Destroyer</span>
                <small>last seen: 1h ago</small>
              </p>
            </li>
            <li className="df aic gap-10">
              <b>FR</b>
              <p className="df fdc gap-5">
                <span>Foobar</span>
                <small>last seen: 2h ago</small>
              </p>
            </li>
            <li className="df aic gap-10">
              <b>OB</b>
              <p className="df fdc gap-5">
                <span>Orio Baggins</span>
                <small>last seen: 3h ago</small>
              </p>
            </li>
            <Button2>See more</Button2>
          </ul>
        </div>
        <div className="hot-tokens mt-20">
          <h3>Hot Tokens</h3>
          <ul className="df fdc gap-10 fs-18 mt-10">
            <li>
              SOL —{" "}
              <span style={{ color: "var(--highlight-green)" }}>$63.00</span>
            </li>
            <li>
              USDC — <span> $1.00</span>
            </li>
            <li>
              RAY —{" "}
              <span style={{ color: "var(--highlight-green)" }}>+15.00%</span>
            </li>
            <li>
              MNDE —{" "}
              <span style={{ color: "var(--highlight-red)" }}>-5.55%</span>
            </li>
            <li>
              ORCA —{" "}
              <span style={{ color: "var(--highlight-green)" }}>+3.25%</span>
            </li>
            <li>
              FTT —{" "}
              <span style={{ color: "var(--highlight-red)" }}>-2.00%</span>
            </li>
            <li>
              BTC —{" "}
              <span style={{ color: "var(--highlight-green)" }}>+1.50%</span>
            </li>
            <li>
              ETH —{" "}
              <span style={{ color: "var(--highlight-red)" }}>-0.50%</span>
            </li>
            <li>
              DOGE —{" "}
              <span style={{ color: "var(--highlight-green)" }}>+0.25%</span>
            </li>
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
              <p>Raydium</p>
              <p>Solcasino</p>
              <p>Solstarter</p>
              <p>Solanium</p>
              <p>Solana Beach</p>
              <p>Solana Explorer</p>
              <p>Solana Wallet</p>
              <p>Solana NFT</p>
            </div>
          </marquee>
        </div>

        <div className="df fdc gap-10 mt-20">
          <h3>Trending</h3>
          <marquee behavior="smooth" direction="row">
            <div className="df aic gap-10">
              <p>#MEMECOIN</p>
              <p>#20MFUNDS</p>
              <p>#TOTHEMOON</p>
              <p>#SOLANA</p>
              <p>#ETHEREUM</p>
              <p>#DOGECOIN</p>
              <p>#RUGPULL</p>
              <p>#NFT</p>
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
                💬 {post.comments} 👍 {post.likes}
              </span>
              <small>{post.timestamp}</small>
            </div>
          </div>
        ))}
      </main>

      <Message />
    </div>
  );
}
