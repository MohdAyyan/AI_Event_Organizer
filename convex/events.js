import { query } from "./_generated/server";

export const getFeaturedEvents = query({
    args:{
        limit: v.optional(v.number()),
    },
    handler: async (ctx, args) => {
        const now = Date.now();
        const events = await ctx.db.query("events").withIndex("by_start_date").filter((q) => q.gte("startDate", now)).order("desc").collect();

        const featured = events.sort((a,b)=> b.registrationCount - a.registrationCount).slice(0, args.limit ?? 3);

        return featured;
    }
})


export const getUpcomingEvents = query({
    args:{
        city: v.optional(v.string()),
        state: v.optional(v.string()),
        limit: v.optional(v.number()),
    },
    handler: async (ctx, args) => { 
        const now = Date.now();
        const events = await ctx.db.query("events").withIndex("by_start_date").filter((q) => q.gte("startDate", now)).order("desc").collect();

        if(args.city){
            events = events.filter((e)=> e.city.toLowerCase() === args.city.toLowerCase());
        }
        else if(args.state){
            events = events.filter((e)=> e.state.toLowerCase() === args.state.toLowerCase());
        }
        return events.slice(0, args.limit ?? 4);

    }
})


export const getPopularEvents = query({
    args:{
        limit: v.optional(v.number()),
    },
    handler: async (ctx, args) => {
        const events = await ctx.db.query("events").withIndex("by_start_date").filter((q) => q.gte("startDate", now)).order("desc").collect();

        const popular = events.sort((a,b)=> b.registrationCount - a.registrationCount).slice(0, args.limit ?? 6);

        return popular;

    }
})

export const getEventsByCategory = query({
    args:{
        category: v.string(),
        limit: v.optional(v.number()),
    },
    handler: async (ctx, args) => {
        const events = await ctx.db.query("events").withIndex("by_category").filter((q) => q.field("startDate"),now).collect();
        
        const counts = {};

        events.forEach((e)=> {
            counts[e.category] = (counts[e.category] || 0) + 1;
        });

        return counts;
    }
})