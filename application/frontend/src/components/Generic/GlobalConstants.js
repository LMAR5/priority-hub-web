const Global = {
    teamAbout: [
        {
            id: 1,
            path: "/MemberGeneric",
            name: "Luis Aguilar",
            role: "Team Lead",
            picture: require('../../assets/images/laguilar.jpeg'),
            description: "My name is Luis Aguilar, I'm from Lima-Peru, and I am currently a first year graduate student at SFSU. I usually spend my free time going out with my friends, listening to music/podcasts, and watching sports. I am a big fan of football and Formula 1."
        },
        {
            id: 2,
            path: "/MemberAndy",
            name: "Andy Li",
            role: "Front Lead",
            picture: require('../../assets/images/andy.jpeg'),
            description: "Hi! I'm Andy and I am currently a fifth year senior at San Francisco State. Some of my favorite ways to spend my free time is by playing games with friends, or watching sports. As a SF native, I am a huge fan of the Golden State Warriors. I casually follow the San Francisco 49ers as well."
        },
        {
            id: 3,
            path: "/MemberLam",
            name: "Lam Tran",
            role: "Back Lead",
            picture: require('../../assets/images/Lam.jpg'),
            description: "Hello! My name is Lam Tran and this is my fifth year at SFSU. I usually spend my time playing video games and researching topics that peak my interest."
        },
        {
            id: 4,
            path: "/MemberTrevor",
            name: "Trevor Eichler",
            role: "Github Master",
            picture: require('../../assets/images/Eichler_Trevor.jpeg'),
            description: "Hello! I have two major hobby interest, the first one being sports and the second one being computing/gaming. I enjoy both playing and watching sports, and I enjoy a broad range of sports from soccer to baseball to basketball to swimming. Just about any sport is enjoyable for me. I also enjoy the acts of programming and interesting with new technologies as well as playing video games with friends in my free time."
        },
        {
            id: 5,
            path: "/MemberTyler",
            name: "Tyler Tam",
            role: "Scrum Master",
            picture: require('../../assets/images/TylerTam.jpeg'),
            description: "My name Is Tyler Tam, I'm from San Francisco and currently a senior at SF State. In my free time I enjoy playing online mutiplayer and stratgey games, along with watching youtube videos. I am also intrested in historic warfare with one of my favorite games being World of Warships."
        }
    ],
    dateOptions: {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    },
    dateOptions2: {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    },
    timeOptions: {
        hour12: true,
        timeZone: 'America/Los_Angeles',
        timeZoneName: 'short',
        hour: '2-digit',
        minute: '2-digit'
    }
}

export default Global;