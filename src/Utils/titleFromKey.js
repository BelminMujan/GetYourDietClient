export const titleFromKey=(key)=>{
    let words = key.split('_')
    let title = ''
    words.forEach(w=>{
        title += w.charAt(0).toUpperCase() + w.slice(1) + ' '
    })
    return title
}