const { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLID, 
    GraphQLSchema,
    GraphQLList, 
    GraphQLNonNull,
    GraphQLEnumType,
} = require('graphql');


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

    }),
});

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
            },
        },
    }),
});



//Create Root Query Object to Retrieve Data
const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields: {
        projects:{
            type: new GraphQLList(ProjectType),
            resolve(parentValue, args){
                return Project.find();
            },
        },
        project: {
            type: ProjectType,
            args: { id: { type: GraphQLID }},
            resolve( parentValue, args) {
                return Project.findById(args.id);
         },
      },  
        clients:{
            type: new GraphQLList(ClientType),
            resolve(parentValue, args){
                return Client.find();
            },
        },
        client: {
            type: ClientType,
            args: { id: { type: GraphQLID }},
            resolve( parentValue, args) {
                return Client.findById(args.id)
         },
      },  
    },
});

//Create Mutations to Edit Your Database
const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {

        //Add Client
        addClient: {
            type: ClientType,
            args:{
                name: { type: GraphQLNonNull(GraphQLString) },
                email: { type: GraphQLNonNull(GraphQLString) },
                phone: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve(parentValue,args){
                const client = new Client({
                    name: args.name,
                    email: args.email,
                    phone: args.phone,
                });
                return client.save();
            },
        },

        //Delete Client
        deleteClient: {
            type: ClientType,
            args:{
                id: { type: GraphQLNonNull(GraphQLID) },
            },
            resolve(parentValue,args){
                return Client.findByIdAndRemove(args.id);
            },
        },

        //Update Client
        updateClient: {
            type: ClientType,
            args:{
                id: { type: GraphQLNonNull(GraphQLID) },
                name: { type: GraphQLString },
                email: { type: GraphQLString },
                phone: { type: GraphQLString },
            },
            resolve(parentValue,args){
                return Client.findByIdAndUpdate(args.id,{
                    $set: {
                        name: args.name,
                        email: args.email,
                        phone: args.phone,
                    },
                },
                { new:true }
                );
            },
        },

        //Add Project
        addProject: {
            type: ProjectType,
            args:{
                name: { type: GraphQLNonNull(GraphQLString) },
                description: { type: GraphQLNonNull(GraphQLString) },
                clientId: { type: GraphQLNonNull(GraphQLID) },
                status: { 
                    type: new GraphQLEnumType({
                        name: 'ProjectStatus',
                        values: {
                            'new': {value: 'Not Started'},
                            'progress': {value: 'In Progress'},
                            'completed': {value: 'Completed'},
                        },
                    }),
                    defaultValue: 'Not Started'
                },
            },
            resolve(parentValue,args){
                const project = new Project({
                    name: args.name,
                    description: args.description,
                    status: args.status,
                    clientId: args.clientId,
                });
                return project.save();
            },
        },

        //Delete Project
        deleteProject: {
            type: ProjectType,
            args:{
                id: { type: GraphQLNonNull(GraphQLID) },
            },
            resolve(parentValue,args){
                return Project.findByIdAndRemove(args.id);
            },
        },

        //Update Project
        updateProject: {
            type: ProjectType,
            args:{
                id: { type: GraphQLNonNull(GraphQLID) },
                name: { type: GraphQLString },
                description: { type: GraphQLString },
                status: { 
                    type: new GraphQLEnumType({
                        name: 'ProjectStatusUpdate', // Has to be unique so can't reuse from above
                        values: {
                            'new': {value: 'Not Started'},
                            'progress': {value: 'In Progress'},
                            'completed': {value: 'Completed'},
                        },
                    }),
                }
            },
            resolve(parentValue,args){
                return Project.findByIdAndUpdate(args.id,{
                    $set: {
                        name: args.name,
                        description : args.description,
                        status: args.status,
                    },
                },
                { new:true }
                );
            },
        },


    }
})



module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation,
})