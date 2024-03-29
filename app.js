const express = require('express');
const cors = require('cors');
const app = express();


const { ENVIRONMENT, PORT } = process.env;
const IS_DEVELOPMENT = ENVIRONMENT === 'development';

// middleware
app.use(express.json());
app.use(cors({
  origin: IS_DEVELOPMENT ? 'http://localhost:3000' : 'https://nasa-images.surge.sh'
}));
const db = {
    favorites: {
        apod: [
            {
                id: "2019_10_29_Village_Moon_Venus_Mercury_1500px.png",
                url: "https://apod.nasa.gov/apod/image/1911/2019_10_29_Village_Moon_Venus_Mercury_1500px.png",
                date: "2019-11-28",
                comment: "November 28, 2019",
                api: "apod"
            },
            {
                id: "Hoag_HubbleBlanco_3000.jpg",
                url: "https://apod.nasa.gov/apod/image/1911/Hoag_HubbleBlanco_3000.jpg",
                date: "2019-11-27",
                comment: "November 27, 2019",
                api: "apod"
            },
            {
                id: "VenJup191124_jcc_2000.jpg",
                url: "https://apod.nasa.gov/apod/image/1911/VenJup191124_jcc_2000.jpg",
                date: "2019-11-26",
                comment: "November 26, 2019",
                api: "apod"
            }
        ],
        mars: [
            {
                id: "FLB_622990123EDR_F0763002FHAZ00341M_.JPG",
                url: "https://mars.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/02540/opgs/edr/fcam/FLB_622990123EDR_F0763002FHAZ00341M_.JPG",
                date: "2019-9-28",
                comment: "September 28, 2019",
                api: "mars",
                array_id: 689597
            } ,
            {
                id: "FLB_622888670EDR_F0763002FHAZ00341M_.JPG",
                url: "https://mars.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/02539/opgs/edr/fcam/FLB_622888670EDR_F0763002FHAZ00341M_.JPG",
                date: "2019-9-27",
                comment: "September 27, 2019",
                api: "mars",
                array_id: 689431
            }
        ]  
    }
}

app.get("/api/favorites", (request, response) => {
    response.json(db.favorites);
});
app.get("/api/favorites/mars", (request, response) => {
    response.json(db.favorites.mars);
});

app.get("/api/favorites/apod", (request, response) => {
    response.json(db.favorites.apod);
});

app.get("/api/favorites/:id", (request, response) => {
    const id = request.params.id;
    const marsPost = db.favorites.mars.find((post) => {
        return post.id === id;
    });
    if(marsPost) {
        response.json(marsPost);
    } else {
        const apodPost = db.favorites.apod.find((post) => {
            return post.id === id;
        });
        if(apodPost) {
            response.json(apodPost);
        } else {
            response.status(404).send();
        }
    }
});
app.get("/api/favorites/mars/:id", (request, response) => {
    const id = request.params.id;
    const post = db.favorites.mars.find((post) => {
        return post.id === id;
    });
    
    if(post) {
        response.json(post);
    } else {
        response.status(404).send();
    }
});

app.get("/api/favorites/apod/:id", (request, response) => {
    const id = request.params.id;
    const post = db.favorites.apod.find((post) => {
        return post.id === id;
    });
    
    if(post) {
        response.json(post);
    } else {
        response.status(404).send();
    }
});

app.post("/api/favorites/mars", (request, response) => {
    const post = request.body;
    // post.id = db.favorites.mars.length + 1;
    db.favorites.mars.push(post);
    response.json(post);
});

app.post("/api/favorites/apod", (request, response) => {
    const post = request.body;
    // post.id = db.favorites.apod.length + 1;
    db.favorites.apod.push(post);
    response.json(post);
});

app.delete("/api/favorites/mars/:id", (request, response) => {
    const id = request.params.id;

    const post = db.favorites.mars.find(post => {
        return id === post.id;
    });
    if (post) {
        db.favorites.mars = db.favorites.mars.filter(post => {
            return post.id !== id;
        });
        response.status(204).send();
    } else {
        response.status(404).send();
    }
});

app.delete("/api/favorites/apod/:id", (request, response) => {
    const id = request.params.id;

    const post = db.favorites.apod.find(post => {
        return id === post.id;
    });
    if (post) {
        db.favorites.apod = db.favorites.apod.filter(post => {
            return post.id !== id;
        });
        response.status(204).send();
    } else {
        response.status(404).send();
    }
});

// app.delete("/api/favorites/apod/:url", (request, response) => {
//     const url = String(request.params.url);
    
//     const post = db.favorites.apod.find(post => {
//         return url === post.url;
//     });
//     response.json(post);
//     if (post) {
//         db.favorites.apod = db.favorites.apod.filter(post => {
//             return post.url !== url;
//         });
//         response.status(204).send();
//     } else {
//         response.status(404).send();
//     }
// });
app.put("/api/favorites/mars/:id", (request, response) => {
    const id = request.params.id;
    const post = db.favorites.mars.find( post => {
        return post.id === id;
    });
    if (post) {
        Object.assign(post, request.body);
        response.json(post);
    } else {
        response.status(404).send();
    }
});

app.put("/api/favorites/apod/:id", (request, response) => {
    const id = request.params.id;
    const post = db.favorites.apod.find( post => {
        return post.id === id;
    });
    if (post) {
        Object.assign(post, request.body);
        response.json(post);
    } else {
        response.status(404).send();
    }
});

app.listen(PORT || 8000);