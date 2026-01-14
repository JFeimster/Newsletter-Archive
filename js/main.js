import { loadData } from './store.js';
import { getQueryParams, getCurrentPage } from './router.js';
import { renderIssueCard, renderCollectionCard, renderFullIssue } from './render.js';

// Global Modal handlers attached to window
window.openSubscribe = () => document.getElementById('subscribe-modal').classList.remove('hidden');
window.closeSubscribe = () => document.getElementById('subscribe-modal').classList.add('hidden');
window.handleSubscribe = (e) => {
    e.preventDefault();
    alert("Thanks for subscribing! (This is a static demo)");
    window.closeSubscribe();
};

async function init() {
    const page = getCurrentPage();
    const siteData = await loadData('site.json');
    
    // Inject Nav & Footer if empty (Shared logic)
    const nav = document.getElementById('nav-container');
    if(nav && siteData) {
        nav.innerHTML = `
        <div class="container nav-flex">
            <a href="index.html" class="brand-wordmark">${siteData.brandName}</a>
            <div class="nav-links">
                <a href="archive.html">Archive</a>
                <a href="about.html">About</a>
                <button class="btn btn-primary" onclick="openSubscribe()">Subscribe</button>
            </div>
        </div>`;
    }

    // Page Specific Logic
    if (page === 'home') {
        const issues = await loadData('issues.json');
        const collections = await loadData('collections.json');
        
        if (issues) {
            document.getElementById('latest-issue-container').innerHTML = renderIssueCard(issues[0]);
        }
        if (collections) {
            document.getElementById('collections-container').innerHTML = collections.map(renderCollectionCard).join('');
        }
    }

    if (page === 'archive') {
        const issues = await loadData('issues.json');
        const grid = document.getElementById('archive-grid');
        if (issues) {
            grid.innerHTML = issues.map(renderIssueCard).join('');
        }
        
        // Simple Filter Logic
        document.querySelectorAll('.filter-chip').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.filter-chip').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                const filter = e.target.dataset.filter;
                
                const filtered = filter === 'all' 
                    ? issues 
                    : issues.filter(i => i.category.toLowerCase() === filter);
                
                grid.innerHTML = filtered.map(renderIssueCard).join('');
            });
        });
    }

    if (page === 'issue') {
        const params = getQueryParams();
        const issues = await loadData('issues.json');
        const container = document.getElementById('issue-content');
        
        const issue = issues.find(i => i.slug === params.slug);
        
        if (issue) {
            container.innerHTML = renderFullIssue(issue);
            document.title = `${issue.title} | ${siteData.brandName}`;
        } else {
            container.innerHTML = `<h2>Signal not found.</h2><a href="archive.html">Return to Archive</a>`;
        }
    }
}

document.addEventListener('DOMContentLoaded', init);
