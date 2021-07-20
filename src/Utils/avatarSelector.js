const importAll = (r) => {
    let images = {};
     r.keys().forEach((item, index) => { images[item.replace('./', '')] = r(item); });
    return images
   }

const avatarSelector = (avatar) => {
    switch(avatar) {
        case 'dog':
            return 'dog.png'
        case 'cat':
            return 'cat.png'
        case 'hamster':
            return 'hamster.png'
        case 'rodent':
            return 'rodent.png'
        case 'lizard':
            return 'lizard.png'
        default:
            return 'cat.png'
    }
}

export { importAll, avatarSelector }