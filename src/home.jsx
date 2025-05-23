import React from "react";
import "./home.css";

export function App() {
  return (
    <div className="app-wrapper">
      {/* Sidebar Left */}
      <aside className="sidebar">
        <div className="profile">
          <div className="avatar">😎</div>
          <div className="username">zauzyad</div>
        </div>
        <div className="friends">
          <p>Friends Online</p>
          <ul>
            <li>Fooopacbleguy</li>
            <li>rugpull_destroyer</li>
            <li>foobar</li>
          </ul>
        </div>
      </aside>

      {/* Main Feed */}
      <main className="feed">
        <h1 className="feed-title">Degen Feed</h1>
        <textarea placeholder="What's on your mind?"></textarea>
        <button className="post-btn">Post</button>

        <div className="post">
          <div className="post-user">Sn0Owshine</div>
          <p><strong>INSIDER:</strong> SOL/USD is preparing for a massive announcement next week.</p>
          <div className="post-actions">💬 8  👍 58</div>
        </div>

        <div className="post">
          <div className="post-user">Newdeddit</div>
          <p>Solana maxis watching ETH gas fees in 2025 <span>#Hopium</span></p>
          <img src="https://i.imgur.com/0rZC5Pn.png" alt="meme" className="post-img" />
          <div className="post-actions">💬 43  👍 312</div>
        </div>
      </main>

      {/* Right Panel */}
      <aside className="right-panel">
        <div className="hot-tokens">
          <h3>Hot Tokens</h3>
          <ul>
            <li>SOL — $63.00</li>
            <li>USDC — $1.00</li>
            <li>RAY — +15.00%</li>
            <li>MNDE — -5.55%</li>
            <li>ORCA — +3.25%</li>
          </ul>
        </div>

        <div className="dex-launchpad">
          <h3>Solana Launchpads & DEXs</h3>
          <p>Raydium</p>
          <p>Solcasino</p>
        </div>

        <div className="trending">
          <h3>Trending</h3>
          <p>#MEMECOIN</p>
          <p>#20MFUNDS</p>
          <p>#TOTHEMOON</p>
        </div>
      </aside>
    </div>
  );
}