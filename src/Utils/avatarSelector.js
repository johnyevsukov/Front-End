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
        case 'bird':
            return 'bird.png'
        case 'duck':
            return 'duck.png'
        case 'fish':
            return 'fish.png'
        case 'frog':
            return 'frog.png'
        case 'hedgehog':
            return 'hedgehog.png'
        case 'horse':
            return 'horse.png'
        case 'pig':
            return 'pig.png'
        case 'rabbit':
            return 'rabbit.png'
        case 'monkey':
            return 'monkey.png'
        case 'snake':
            return 'snake.png'
        case 'spider':
            return 'spider.png'
        case 'turtle':
            return 'turtle.png'
        default:
            return 'cat.png'
    }
}

export { importAll, avatarSelector }
