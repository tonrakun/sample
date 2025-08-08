// AOS (Animate On Scroll) 初期化
AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
    easing: 'ease-out-cubic'
});

// モバイルメニューの制御
class MobileMenu {
    constructor() {
        this.menuButton = document.getElementById('mobile-menu-button');
        this.mobileMenu = document.getElementById('mobile-menu');
        this.isOpen = false;
        
        this.init();
    }
    
    init() {
        if (this.menuButton && this.mobileMenu) {
            this.menuButton.addEventListener('click', () => this.toggle());
            this.setupMenuLinks();
        }
    }
    
    toggle() {
        this.isOpen = !this.isOpen;
        
        if (this.isOpen) {
            this.open();
        } else {
            this.close();
        }
    }
    
    open() {
        this.mobileMenu.classList.remove('hidden');
        this.menuButton.innerHTML = '<i class="fas fa-times"></i>';
        document.body.style.overflow = 'hidden';
    }
    
    close() {
        this.mobileMenu.classList.add('hidden');
        this.menuButton.innerHTML = '<i class="fas fa-bars"></i>';
        document.body.style.overflow = '';
    }
    
    setupMenuLinks() {
        const menuLinks = this.mobileMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => this.close());
        });
    }
}

// ナビゲーションの背景制御
class NavigationController {
    constructor() {
        this.nav = document.querySelector('nav');
        this.init();
    }
    
    init() {
        if (this.nav) {
            window.addEventListener('scroll', () => this.handleScroll());
        }
    }
    
    handleScroll() {
        if (window.scrollY > 50) {
            this.nav.classList.add('shadow-lg');
        } else {
            this.nav.classList.remove('shadow-lg');
        }
    }
}

// スムーズスクロール
class SmoothScroll {
    constructor() {
        this.init();
    }
    
    init() {
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', (e) => this.handleClick(e));
        });
    }
    
    handleClick(e) {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
}

// パフォーマンス最適化のための画像遅延読み込み
class LazyImageLoader {
    constructor() {
        this.images = document.querySelectorAll('img[data-src]');
        this.init();
    }
    
    init() {
        if ('IntersectionObserver' in window) {
            this.observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.loadImage(entry.target);
                        this.observer.unobserve(entry.target);
                    }
                });
            });
            
            this.images.forEach(img => this.observer.observe(img));
        } else {
            // フォールバック: 古いブラウザ対応
            this.images.forEach(img => this.loadImage(img));
        }
    }
    
    loadImage(img) {
        img.src = img.dataset.src;
        img.classList.add('fade-in');
    }
}

// フォームのバリデーション
class ContactForm {
    constructor() {
        this.form = document.querySelector('#contact form');
        this.init();
    }
    
    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }
    
    handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);
        
        if (this.validateForm(data)) {
            this.showSuccessMessage();
            this.form.reset();
        }
    }
    
    validateForm(data) {
        // 簡単なバリデーション例
        const requiredFields = ['name', 'email', 'message'];
        const missingFields = requiredFields.filter(field => !data[field] || data[field].trim() === '');
        
        if (missingFields.length > 0) {
            this.showErrorMessage(`以下の項目は必須です: ${missingFields.join(', ')}`);
            return false;
        }
        
        // メールアドレスの形式チェック
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            this.showErrorMessage('有効なメールアドレスを入力してください');
            return false;
        }
        
        return true;
    }
    
    showSuccessMessage() {
        this.showMessage('メッセージを送信しました。ありがとうございます！', 'success');
    }
    
    showErrorMessage(message) {
        this.showMessage(message, 'error');
    }
    
    showMessage(message, type) {
        // 既存のメッセージを削除
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // 新しいメッセージを作成
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message p-4 rounded-lg mb-4 ${type === 'success' ? 'bg-green-600/20 text-green-400 border border-green-600/30' : 'bg-red-600/20 text-red-400 border border-red-600/30'}`;
        messageDiv.textContent = message;
        
        // フォームの前に挿入
        this.form.parentNode.insertBefore(messageDiv, this.form);
        
        // 5秒後に自動削除
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 5000);
    }
}

// スキルバーのアニメーション
class SkillBars {
    constructor() {
        this.skillBars = document.querySelectorAll('.bg-white');
        this.init();
    }
    
    init() {
        if (this.skillBars.length > 0 && 'IntersectionObserver' in window) {
            this.observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animateSkillBar(entry.target);
                        this.observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            this.skillBars.forEach(bar => {
                if (bar.parentElement.querySelector('span')) {
                    this.observer.observe(bar);
                }
            });
        }
    }
    
    animateSkillBar(bar) {
        const width = bar.style.width;
        bar.style.width = '0%';
        bar.style.transition = 'width 2s ease-out';
        
        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    }
}

// パフォーマンス監視
class PerformanceMonitor {
    constructor() {
        this.init();
    }
    
    init() {
        // ページロード完了時の処理
        window.addEventListener('load', () => {
            this.logPerformanceMetrics();
        });
    }
    
    logPerformanceMetrics() {
        if ('performance' in window) {
            const navigation = performance.getEntriesByType('navigation')[0];
            const loadTime = navigation.loadEventEnd - navigation.fetchStart;
            
            console.log(`Page load time: ${loadTime}ms`);
            
            // 必要に応じて分析ツールに送信
            // analytics.track('page_load_time', { duration: loadTime });
        }
    }
}

// ユーティリティ関数
const utils = {
    // デバウンス関数
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // スロットル関数
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    // 要素が画面内にあるかチェック
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

// DOM読み込み完了後に初期化
document.addEventListener('DOMContentLoaded', () => {
    // 各機能クラスを初期化
    new MobileMenu();
    new NavigationController();
    new SmoothScroll();
    new LazyImageLoader();
    new ContactForm();
    new SkillBars();
    new PerformanceMonitor();
    
    // カスタムカーソル効果（オプション）
    if (window.innerWidth > 768) {
        initCustomCursor();
    }
});

// カスタムカーソル効果
function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: rgba(102, 126, 234, 0.5);
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
        transform: translate(-50%, -50%);
    `;
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    // ホバー効果
    const hoverElements = document.querySelectorAll('a, button, .card-hover');
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
}

// エラーハンドリング
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
    // 必要に応じてエラー報告サービスに送信
});

// 未処理のPromiseエラーをキャッチ
window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled Promise Rejection:', e.reason);
    e.preventDefault();
});