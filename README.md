🎮 2048 Game

A modern, mobile-friendly clone of the classic 2048 puzzle game, built with HTML, CSS, and JavaScript.

[👉 Play Now!](https://atimrish.github.io/2048/)

🔥 Features

✔ Responsive design – Works on desktop, tablets, and mobile devices.
✔ Touch controls – Swipe gestures supported on mobile.
✔ Smooth animations – Tile movements and merges feel fluid.
✔ Score tracking – Keeps your best score in local storage.
🛠 How to Run Locally

    Clone the repo:
    ```sh
    git clone https://github.com/atimrish/2048.git
    ```
    Open the game:

        Navigate to the project folder and open index.html in a browser.
        Or use a local server (e.g., VS Code Live Server, python -m http.server).

📱 Mobile Optimization

    Prevented accidental refresh (overscroll-behavior-y: contain and overflow: hidden stops pull-to-refresh).
    No scroll interference – CSS ensures the game takes full viewport space.

📜 Rules

    Swipe (↑, ↓, ←, →) to move tiles.
    Merge identical numbers to reach 2048 (or higher!).
    Game ends when the board fills up with no possible moves.

🤝 Contributing

Want to improve the game? Submit a PR or open an Issue!

    Ideas:

        Add undo feature
        Improve animations
        Add scoreboard
