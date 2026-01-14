export function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return Object.fromEntries(params.entries());
}

export function getCurrentPage() {
    const path = window.location.pathname;
    if (path.endsWith('issue.html')) return 'issue';
    if (path.endsWith('archive.html')) return 'archive';
    return 'home';
}
