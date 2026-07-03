/* =========================================================
   SYNERGY PROTOCOL — SHARED PROFILE SHEET
   Sanya wannan file a duk page da kake son sheet din ya bayyana:
   <script src="profile-sheet.js"></script>

   Kar a taba wani abu a wannan file sai idan kana son
   canza SHEET DIN KANSA (content, style, ko icons).
   Idan kana son canza DOCK din (icons na kasa), kar ka taba nan —
   dock din yana zaune a kowanne page daban.
   ========================================================= */

(function () {

    // ---------- 1. CSS ----------
    const style = document.createElement('style');
    style.textContent = `
        #profile-sheet-overlay {
            position: fixed; inset: 0;
            background: rgba(0,0,0,0.65);
            backdrop-filter: blur(6px);
            z-index: 69999;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.35s ease;
        }
        #profile-sheet-overlay.active { opacity: 1; pointer-events: auto; }

        #profile-sheet {
            position: fixed;
            left: 50%;
            bottom: 0;
            transform: translate(-50%, 100%);
            width: min(94%, 460px);
            z-index: 70000;
            background: var(--bg, #020617);
            background-image: radial-gradient(circle at 50% 0%, rgba(112, 0, 255, 0.12), transparent 70%);
            border: 1px solid rgba(0,242,254,0.15);
            border-bottom: none;
            border-top: 2px solid #00f2fe;
            border-radius: 28px 28px 0 0;
            padding: 10px 16px calc(24px + env(safe-area-inset-bottom)) 16px;
            transition: transform 0.45s cubic-bezier(0.19, 1, 0.22, 1);
            box-shadow: 0 -20px 60px rgba(0,0,0,0.6);
        }
        #profile-sheet.active { transform: translate(-50%, 0); }

        .sheet-handle {
            width: 36px; height: 4px;
            background: rgba(255,255,255,0.15);
            border-radius: 10px;
            margin: 8px auto 18px auto;
        }

        .sheet-item {
            display: flex; align-items: center; gap: 14px;
            padding: 14px 8px;
            border-radius: 18px;
            cursor: pointer;
            transition: background 0.2s ease;
        }
        .sheet-item:hover, .sheet-item:active { background: rgba(255,255,255,0.04); }

        .sheet-icon-box {
            width: 42px; height: 42px;
            border-radius: 13px;
            background: rgba(0,242,254,0.08);
            border: 1px solid rgba(0,242,254,0.15);
            display: flex; align-items: center; justify-content: center;
            flex-shrink: 0;
        }
        .sheet-icon-box svg { width: 19px; height: 19px; stroke: #00f2fe; fill: none; stroke-width: 2; }
        .sheet-icon-box.danger-box { background: rgba(248,113,113,0.08); border-color: rgba(248,113,113,0.2); }
        .sheet-icon-box.danger-box svg { stroke: #f87171; }

        .sheet-item-text { flex: 1; display: flex; flex-direction: column; gap: 2px; }
        .sheet-item-text span {
            font-family: 'Space Grotesk', sans-serif;
            font-size: 13.5px; font-weight: 600; color: #f1f1f1;
        }
        .sheet-item-text p {
            font-family: 'Space Grotesk', sans-serif;
            font-size: 10.5px; color: rgba(255,255,255,0.35); margin: 0;
        }
        .sheet-item.danger .sheet-item-text span { color: #f87171; }

        .sheet-item .chevron { width: 15px; height: 15px; stroke: rgba(255,255,255,0.2); fill: none; stroke-width: 2; flex-shrink: 0; }

        .sheet-divider { height: 1px; background: rgba(255,255,255,0.05); margin: 4px 4px; }
    `;
    document.head.appendChild(style);

    // ---------- 2. HTML ----------
    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
        <div id="profile-sheet-overlay"></div>
        <div id="profile-sheet">
            <div class="sheet-handle"></div>

            <div class="sheet-item" data-href="referrals.html">
                <div class="sheet-icon-box">
                    <svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                </div>
                <div class="sheet-item-text">
                    <span>Referrals</span>
                    <p>Invite friends & earn rewards</p>
                </div>
                <svg class="chevron" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </div>

            <div class="sheet-divider"></div>

            <div class="sheet-item" data-href="settings.html">
                <div class="sheet-icon-box">
                    <svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                </div>
                <div class="sheet-item-text">
                    <span>Settings</span>
                    <p>Bank details & withdrawal setup</p>
                </div>
                <svg class="chevron" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </div>

            <div class="sheet-item" data-href="support.html">
                <div class="sheet-icon-box">
                    <svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="M18.36 18.36a9 9 0 1 0-12.72 0"></path><circle cx="12" cy="12" r="3"></circle></svg>
                </div>
                <div class="sheet-item-text">
                    <span>Support</span>
                    <p>Get help from our team</p>
                </div>
                <svg class="chevron" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </div>

            <div class="sheet-divider"></div>

            <div class="sheet-item danger" data-href="signin.html">
                <div class="sheet-icon-box danger-box">
                    <svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                </div>
                <div class="sheet-item-text"><span>Log out</span></div>
            </div>
        </div>
    `;
    document.body.appendChild(wrapper);

    // ---------- 3. Wiring (click navigation) ----------
    document.querySelectorAll('#profile-sheet .sheet-item[data-href]').forEach(item => {
        item.addEventListener('click', () => {
            location.href = item.getAttribute('data-href');
        });
    });

    document.getElementById('profile-sheet-overlay').addEventListener('click', closeProfileSheet);

    // ---------- 4. Global open/close functions ----------
    // Wadannan su ne functions din da dock din kowanne page ke kira
    // (onclick="openProfileSheet()")
    window.openProfileSheet = function () {
        document.getElementById('profile-sheet-overlay').classList.add('active');
        document.getElementById('profile-sheet').classList.add('active');
    };

    window.closeProfileSheet = function () {
        document.getElementById('profile-sheet-overlay').classList.remove('active');
        document.getElementById('profile-sheet').classList.remove('active');
        if (typeof setDockActive === 'function') setDockActive(-1);
    };

})();
