// Template functions
export function renderIssueCard(issue) {
    return `
    <article class="bento-card">
        <span class="tiny-text" style="color:var(--text-accent)">${issue.date} • ${issue.category}</span>
        <h3 style="margin: var(--space-sm) 0;"><a href="issue.html?slug=${issue.slug}">${issue.title}</a></h3>
        <p style="color: var(--text-muted)">${issue.excerpt}</p>
    </article>
    `;
}

export function renderCollectionCard(collection) {
    return `
    <div class="bento-card" style="background-image: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.9)), url('${collection.image}'); background-size: cover;">
        <h3>${collection.title}</h3>
        <p>${collection.count} Signals</p>
    </div>
    `;
}

export function renderFullIssue(issue) {
    // Basic Markdown-like parser for the content block
    const contentHtml = issue.content.split('\n\n').map(para => `<p style="margin-bottom: 1em;">${para}</p>`).join('');
    
    return `
        <div class="article-header text-center" style="margin-bottom: var(--space-lg)">
            <span class="tiny-text">${issue.date} / No. ${issue.id}</span>
            <h1 style="font-size: var(--h1); margin-top: var(--space-sm);">${issue.title}</h1>
            <div class="tags" style="margin-top: var(--space-md)">
                ${issue.tags.map(tag => `<span class="filter-chip">${tag}</span>`).join(' ')}
            </div>
        </div>
        <div class="article-body" style="font-size: 1.2rem; max-width: 700px; margin: 0 auto;">
            ${contentHtml}
        </div>
    `;
}
