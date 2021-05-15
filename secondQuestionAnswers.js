

const mongoose = require('mongoose');
// bookmark schema
const bookmarkSchema = new mongoose.Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'Users' },
    feedId: { type: Schema.Types.ObjectId, ref: 'Feeds' }
});
const Bookmark = mongoose.model('Bookmark', bookmarkSchema)

// Feeds Schema
const feedsSchema = new mongoose.Schema({
    client_id: { type: Schema.Types.ObjectId, ref: 'Users' },
    userId: { type: Schema.Types.ObjectId, ref: 'Users' },
    title: String,
    desc: String,
    upVotes: [{ type: Schema.Types.ObjectId, ref: 'Users' }]
});
const Feeds = mongoose.model('Feeds', feedsSchema)

// User Schema
const usersSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    contact: number,
});
const Users = mongoose.model('Users', usersSchema)


// Fetch all the bookmarks by user by userID
let user_id = 11;
Bookmark.find({ userId: user_id }, function (err, docs) { });


//List of feeds by client_id
let clientId = 21;
Feeds.find({ client_id: clientId })
    .populate('userId')
    .exec(function (err, data) {
        if (err) return handleError(err);
        console.log(data);
    });


Feeds.aggregate([{
    $match: {
        'client_id': mongoose.Types.ObjectId(clientId)
    }
},
{
    $lookup: {
        from: "Users",
        localField: "userId",
        foreignField: "_id",
        as: "user"
    }
},
{
    $lookup: {
        from: "Bookmark",
        let: {
            "feed_id": "$_id"
        },
        pipeline: [{
            "$match": {
                "$expr": {
                    "$and": [{
                        "$eq": ["$feedId", '$$feed_id']
                    },
                    {
                        "$eq": ["$userId", mongoose.Types.ObjectId(clientId)]
                    }
                    ]
                }
            }
        }],
        as: "bookmark"
    }
},
    , {
    $project: {
        _id: 1,
        title: 1,
        desc: 1,
        user: 1,
        totalUpVotes: {
            $cond: {
                if: {
                    $gt: [{
                        $size: "$upVotes"
                    }, 0]
                },
                then: {
                    $size: "$upVotes"
                },
                else: 0
            }
        },
        isBookmarked: {
            $cond: {
                if: {
                    $gt: [{
                        $size: "$bookmark"
                    }, 0]
                },
                then: true,
                else: false
            }
        }
    }
}
]).exec().then(result => {
    if (result && Array.isArray(result) && result.length > 0) {
        result = result.map(item => {
            item['type'] = 'company';
            return item;
        })
    }
    return Promise.resolve(result);
}).catch(err => {
    console.log("Error in fetching company details", err);
    return Promise.resolve([]);
})



//List of feeds upVote by user
let userID = 11;
Feeds.find({ upVotes: userID }, function (err, docs) { })
