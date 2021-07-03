const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLList } = require("graphql");
const fetch = require("cross-fetch");
const { response } = require("express");



const messageType = new GraphQLObjectType({
    name: 'message',
    fields: {
        id: { type: GraphQLString },
        username: { type: GraphQLString },
        body: { type: GraphQLString }
    }
})


const RootQueryType = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        messages: {
            type: GraphQLList(messageType),
            async resolve(parentValue, args){
                const reesponse = await fetch("http://localhost:3000/",messages);
                const data = await response.json();
                return data;
            }
        }
    }
})

const addMessage = {
    type: messageType,
    args: {
        username: { type: GraphQLString},
        body: { type: GraphQLString}
    },
    async resolve(parentValue, args){
        const response = await fetch("http://localhost:3000/messages", {
            method: 'POST',
            body: JSON.stringify(args),
            headers: {"Content-Type": "application/json"};
        })
        const data = await response.json();
        return data;
    }
}


const MutationType = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addMessage: addMessage
    }
})


const schema = new GraphQLSchema{
    query: RootQuery,
    mutation: MutationType
}

module.exports = schema