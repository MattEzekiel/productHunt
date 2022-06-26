export function is_mobile() {
    return window.matchMedia('(max-width: 991px)').matches;
}