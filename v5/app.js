// App logic - A Classe Inútil
// Requires: content.js loaded first (provides bookData)

(function () {
    var _glyphs = '\u0410\u0412\u0421\u0415\u041a\u041c\u041d\u041e\u0420\u0422\u0425\u0393\u0394\u0398\u039b\u039e\u03a0\u03a3\u03a6\u03a8\u03a9\u2588\u2591\u2592\u2593\u2502\u2500\u253c\u2534\u252c\u251c\u2524\u2248\u00d7\u2260\u2264\u2265\u221e\u2202\u222b\u00ab\u00bb\u25a0\u25a1\u25b2\u25b3\u25cf\u25cb';

    function scrambleWord(word, intensity) {
        if (intensity <= 0) return word;
        if (intensity >= 1) {
            var r = '';
            for (var i = 0; i < word.length; i++) r += _glyphs[Math.floor(Math.random() * _glyphs.length)];
            return r;
        }
        var chars = word.split('');
        var n = Math.floor(chars.length * intensity);
        for (var i = 0; i < n; i++) {
            var idx = Math.floor(Math.random() * chars.length);
            if (Math.random() < 0.6) {
                chars[idx] = _glyphs[Math.floor(Math.random() * _glyphs.length)];
            } else {
                var swapIdx = Math.min(chars.length - 1, Math.max(0, idx + (Math.random() > 0.5 ? 1 : -1)));
                var tmp = chars[idx]; chars[idx] = chars[swapIdx]; chars[swapIdx] = tmp;
            }
        }
        return chars.join('');
    }

    function buildContent(data) {
        var container = document.getElementById('bookContent');
        var html = '';
        data.forEach(function (block, i) {
            var ch = block.ch || 0;
            var chAttr = ' data-ch="' + ch + '"';
            switch (block.t) {
                case 'chapter-label':
                    html += '<div class="chapter-label" data-idx="' + i + '"' + chAttr + '>' + block.c + '</div>';
                    break;
                case 'chapter-title':
                    html += '<h2 class="chapter-title" data-idx="' + i + '"' + chAttr + '>' + block.c + '</h2>';
                    break;
                case 'epigraph':
                    html += '<blockquote class="epigraph" data-idx="' + i + '"' + chAttr + '><p>\u201c' + block.c + '\u201d</p><cite>\u2014 ' + block.a + '</cite></blockquote>';
                    break;
                case 'section':
                    html += '<div class="section-divider"><span class="dot"></span></div>';
                    html += '<h3 class="section-heading" data-idx="' + i + '"' + chAttr + '>' + block.c + '</h3>';
                    break;
                case 'subsection':
                    html += '<h4 class="section-heading" style="font-size:1.15rem;margin-top:36px;" data-idx="' + i + '"' + chAttr + '>' + block.c + '</h4>';
                    break;
                case 'stat':
                    html += '<div class="highlight-stat" data-idx="' + i + '"' + chAttr + '>' + block.c + '</div>';
                    break;
                case 'p':
                    var hasNewlines = block.c.indexOf('\n') !== -1;
                    var isTocList = hasNewlines && ch === 0;
                    var extraClass = isTocList ? ' toc-list' : '';
                    // Split by newlines first to preserve line breaks
                    var lines = block.c.split('\n');
                    var lineHtmls = lines.map(function (line) {
                        var words = line.split(/(\s+)/);
                        return words.map(function (w) {
                            if (/^\s+$/.test(w)) return w;
                            return '<span class="word" data-original="' + w.replace(/"/g, '&quot;') + '">' + w + '</span>';
                        }).join('');
                    });
                    html += '<p class="book-paragraph' + extraClass + '" data-idx="' + i + '"' + chAttr + '>' + lineHtmls.join('<br>') + '</p>';
                    break;
            }
        });
        container.innerHTML = html;
    }

    // Build content from bookData (loaded via content.js)
    buildContent(bookData);

    // DOM references
    var progressBar = document.getElementById('progressBar');
    var corruptionIndicator = document.getElementById('corruptionIndicator');
    var corruptionFill = document.getElementById('corruptionFill');
    var corruptionPct = document.getElementById('corruptionPct');
    var corruptionOverlay = document.getElementById('corruptionOverlay');
    var ctaGateway = document.getElementById('ctaGateway');
    var aiTerminal = document.getElementById('aiTerminal');

    var ticking = false;
    var lastCorruptionLevel = -1;
    var terminalShown = false;
    var terminalShownAt = 0;
    var terminalLineIndex = 0;
    var ch3Top = 0, ch3Height = 1, ch3Measured = false;

    function measureCh3() {
        var ch3Els = document.querySelectorAll('[data-ch="3"]');
        if (ch3Els.length === 0) return;
        var first = ch3Els[0];
        var last = ch3Els[ch3Els.length - 1];
        ch3Top = first.getBoundingClientRect().top + window.scrollY;
        var ch3Bottom = last.getBoundingClientRect().bottom + window.scrollY;
        ch3Height = Math.max(1, ch3Bottom - ch3Top);
        ch3Measured = true;
    }

    function getScrollProgress() {
        var scrollTop = window.scrollY;
        var docHeight = document.documentElement.scrollHeight - window.innerHeight;
        return Math.min(1, Math.max(0, scrollTop / docHeight));
    }

    function showTerminalLines() {
        if (terminalLineIndex > 4) return;
        var line = document.getElementById('aiLine' + terminalLineIndex);
        if (line) {
            line.classList.add('visible');
            // Animate the ████ blocks on line 3
            if (terminalLineIndex === 3) {
                var warning = line.querySelector('.warning');
                if (warning) warning.classList.add('loading');
            }
            terminalLineIndex++;
            if (terminalLineIndex <= 4) {
                setTimeout(showTerminalLines, 600);
            }
        }
    }

    function updateCorruption() {
        var progress = getScrollProgress();
        progressBar.style.width = (progress * 100) + '%';

        if (!ch3Measured) measureCh3();

        var viewCenter = window.scrollY + window.innerHeight * 0.4;
        var ch3Progress = Math.max(0, Math.min(1, (viewCenter - ch3Top) / ch3Height));

        var corruption = Math.max(0, Math.min(1, (ch3Progress - 0.30) / 0.55));

        var quantized = Math.round(corruption * 50) / 50;
        if (quantized === lastCorruptionLevel) { ticking = false; return; }
        lastCorruptionLevel = quantized;

        if (corruption > 0.05) {
            corruptionIndicator.classList.add('visible');
            corruptionFill.style.width = (corruption * 100) + '%';
            corruptionPct.textContent = Math.round(corruption * 100) + '%';
        } else {
            corruptionIndicator.classList.remove('visible');
        }

        if (corruption > 0.15 && !terminalShown) {
            terminalShown = true;
            terminalShownAt = Date.now();
            aiTerminal.classList.add('visible');
            terminalLineIndex = 1;
            setTimeout(showTerminalLines, 400);
        }
        // Terminal stays visible for at least 5 seconds
        if (corruption > 0.80 && terminalShown && (Date.now() - terminalShownAt > 5000)) {
            aiTerminal.classList.remove('visible');
        }

        if (corruption > 0.30) {
            corruptionOverlay.classList.add('visible');
            corruptionOverlay.style.opacity = Math.min(1, (corruption - 0.30) * 2);
        } else {
            corruptionOverlay.classList.remove('visible');
        }

        // CTA only after corruption bar reaches 100%
        if (corruption >= 0.98) {
            ctaGateway.classList.add('visible');
        } else {
            ctaGateway.classList.remove('visible');
        }

        var ch3Words = document.querySelectorAll('.book-paragraph[data-ch="3"] .word');
        var totalWords = ch3Words.length;

        for (var i = 0; i < totalWords; i++) {
            var el = ch3Words[i];
            var wordPosition = i / totalWords;
            var localIntensity = Math.max(0, corruption * 2.2 - wordPosition * 0.9);
            var ci = Math.min(1, localIntensity);

            if (ci <= 0) {
                el.textContent = el.dataset.original;
                el.className = 'word';
                continue;
            }

            if (ci < 0.08) {
                el.textContent = el.dataset.original;
                el.className = 'word trembling';
            } else if (ci < 0.25) {
                el.className = 'word trembling corrupted';
                el.textContent = scrambleWord(el.dataset.original, ci * 0.5);
            } else {
                el.textContent = scrambleWord(el.dataset.original, ci);
                if (ci > 0.7) {
                    el.className = 'word glitched';
                } else {
                    el.className = 'word corrupted';
                }
            }
        }

        var ch3Headings = document.querySelectorAll('.section-heading[data-ch="3"], .highlight-stat[data-ch="3"]');
        for (var j = 0; j < ch3Headings.length; j++) {
            var h = ch3Headings[j];
            if (corruption > 0.45) {
                var hi = Math.min(1, (corruption - 0.45) * 2.5);
                if (!h.dataset.original) h.dataset.original = h.textContent;
                h.textContent = scrambleWord(h.dataset.original, hi);
                if (hi > 0.5) h.style.color = 'var(--text-dim)';
            } else {
                if (h.dataset.original) { h.textContent = h.dataset.original; h.style.color = ''; }
            }
        }

        ticking = false;
    }

    // Scroll & resize listeners
    window.addEventListener('scroll', function () {
        if (!ticking) { requestAnimationFrame(updateCorruption); ticking = true; }
    }, { passive: true });

    window.addEventListener('resize', function () { ch3Measured = false; });

    // Copy protection
    document.getElementById('bookContent').addEventListener('contextmenu', function (e) { e.preventDefault(); });
    document.addEventListener('copy', function (e) {
        var sel = window.getSelection();
        var bc = document.getElementById('bookContent');
        if (bc.contains(sel.anchorNode)) e.preventDefault();
    });

    // Font size controls
    var fontDecrease = document.getElementById('fontDecrease');
    var fontIncrease = document.getElementById('fontIncrease');
    var fontSizeLabel = document.getElementById('fontSizeLabel');
    var bookContainer = document.getElementById('bookContent');

    var currentFontSize = 100; // percentage
    var MIN_FONT_SIZE = 70;
    var MAX_FONT_SIZE = 150;
    var STEP = 10;

    function updateFontSize(newSize) {
        currentFontSize = Math.max(MIN_FONT_SIZE, Math.min(MAX_FONT_SIZE, newSize));
        bookContainer.style.fontSize = (currentFontSize / 100) * 1.08 + 'rem';
        fontSizeLabel.textContent = currentFontSize + '%';
        // Re-measure chapter 3 after font change
        ch3Measured = false;
    }

    fontDecrease.addEventListener('click', function () {
        updateFontSize(currentFontSize - STEP);
    });

    fontIncrease.addEventListener('click', function () {
        updateFontSize(currentFontSize + STEP);
    });

    // Initial setup
    setTimeout(function () { ch3Measured = false; measureCh3(); }, 1000);
    updateCorruption();
})();
