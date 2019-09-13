const axios = require('axios');

const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLBoolean,
    GraphQLList,
    GraphQLSchema
} = require('graphql');

// Launch Type
const LaunchType = new GraphQLObjectType({
    name: 'Launch',
    fields: () => ({
        flight_number: { type: GraphQLInt },
        mission_name: { type: GraphQLString },
        lunch_year: { type: GraphQLString },
        lunch_date_local: { type: GraphQLString },
        lunch_success: { type: GraphQLBoolean },
        flight_number: { type: GraphQLInt },
        rocket: { type: RocketType }
    })
})


// Rocket Type

const RocketType = new GraphQLObjectType({
    name: 'Rocket',
    fields: () => ({
        rocket_id: { type: GraphQLString },
        rocket_name: { type: GraphQLString },
        rocket_type: { type: GraphQLString },
    })
});

// Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        launches: {
            type: new GraphQLList(LaunchType),
            resolve(parents, args) {
                return axios.get('https://api.spacexdata.com/v3/launches')
                    .then(res => res.data);

            }
        },
        launch: {
            type: LaunchType,
            args: {
                flight_number: { type: GraphQLInt }
            },
            resolve(parents, args) {
                return axios.get(`https://api.spacexdata.com/v3/launches/${args.flight_number}`)
                    .then(res => res.data); // single launch flight number
            }
        },
        rockets: {
            type: new GraphQLList(RocketType),
            resolve(parents, args) {
                return axios.get('https://api.spacexdata.com/v3/rockets')
                    .then(res => res.data);

            }
        },
        rocket: {
            type: RocketType,
            args: {
                id: { type: GraphQLInt }
            },
            resolve(parents, args) {
                return axios.get(`https://api.spacexdata.com/v3/rockets/${args.id}`)
                    .then(res => res.data); // single launch flight number
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});


