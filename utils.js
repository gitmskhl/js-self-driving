function lerp(a, b, p) {
    return a + (b - a) * p
}

function getIntersection(A, B, C, D) {
    let top = (D.x - C.x) * (A.y - C.y) - (D.y - C.y) * (A.x - C.x)
    let bottom = (D.y - C.y) * (B.x - A.x) - (D.x - C.x) * (B.y - A.y)
    if (bottom == 0) return null
    let t = top / bottom
    if (t > 1 || t < 0) return null
    return {
        x: lerp(A.x, B.x, t),
        y: lerp(A.y, B.y, t),
        offset: t
    }
}

function getStrongIntersection(A ,B, C, D) {
    return getIntersection(C, D, A, B) && getIntersection(A, B, C, D)
}


function polyIntersect(poly1, poly2, checkIntersect=getIntersection) {
    for (let i = 0; i < poly1.length; ++i)
        for (let j = 0; j < poly2.length; ++j)
            if (checkIntersect(
                poly1[i],
                poly1[(i + 1) % poly1.length],
                poly2[j],
                poly2[(j + 1) % poly2.length] 
            )) return true
    return false
}

function polygon2borders(polygon) {
    let borders = []
    for (let i = 0; i < polygon.length; ++i)
        borders.push([polygon[i], polygon[(i + 1) % polygon.length]])
    return borders
}