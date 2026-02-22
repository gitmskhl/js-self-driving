function lerp(a, b, p) {
    return a + (b - a) * p
}

function getIntersection(A, B, C, D) {
    let top = (D.x - C.x) * (A.y - C.y) - (D.y - C.y) * (A.x - C.x)
    let bottom = (D.y - C.y) * (B.x - A.x) - (D.x - C.x) * (B.y - A.y)
    if (bottom == 0) return null
    let t = top / bottom
    console.log('bottom', bottom, A, B, C, D)
    if (t > 1 || t < 0) return null
    return {
        x: lerp(A.x, B.x, t),
        y: lerp(A.y, B.y, t),
        offset: t
    }
}