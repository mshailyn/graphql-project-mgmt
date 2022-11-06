const { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLID, 
    GraphQLSchema,
    GraphQLList, 
} = require('graphql')


//Mongoose Models
const Client = require('../models/Client');
const Project = require('../models/Project');


// Client Type
const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString},

    })
})

//Project Type
const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { type: GraphQLString},
        client: {
            type: ClientType,
            resolve(parentValue, args){
                return Client.findById(parentValue.clientId);
            }
        }
    })
})



//Create Root Query Object to Retrieve Data
const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields: {
        projects:{
            type: new GraphQLList(ProjectType),
            resolve(parentValue, args){
                return Project.find();
            }
        },
        project: {
            type: ProjectType,
            args: { id: { type: GraphQLID }},
            resolve( parentValue, args) {
                return Project.findById(args.id);
         }
      },  
        clients:{
            type: new GraphQLList(ClientType),
            resolve(parentValue, args){
                return Client.find();
            }
        },
        client: {
            type: ClientType,
            args: { id: { type: GraphQLID }},
            resolve( parentValue, args) {
                return Client.findById(args.id)
         }
      },  
    }
})



module.exports = new GraphQLSchema({
    query: RootQuery
})