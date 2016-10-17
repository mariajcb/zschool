'use strict'

exports.seed = function(knex, Promise) {
    return knex(`posts`).del()
        .then(() => {
            return knex(`posts`).insert([{
                title: `it begins`,
                body: `We should have seen it coming, I suppose. In the last few weeks, one instructor after another began getting sick. It all started with Craig. His strange behavior, the mysterious absences...We should have known. Half the class is gone now.
          The instructors have gone into a meeting before the epidemic hit, so I'm not sure how many are still standing. We saw Matt and James roaming the halls.  No word from Elana yet.  Zack ran off to get his guns, but we have not heard from him in days.
          I am creating this blog in hopes that someone is still out there.  This CRUD app seems to be our only hope.`,
                user_id: 1,
            }, {
                title: `testing`,
                body: `Our room is secure. We have barricaded the doors and hung our clothes around the glass.
          The groans coming from g36's room have been incessant, but so far, the wall has held them back.
          I am so glad we are closest to the kitchen.  Stephanie, if you're out there...We could use more snacks.`,
                user_id: 1,
            }, {
                title: `I'm just really fed up with all of this really.`,
                body: `People should be more responsible and considerate. Like if you're going to be a zombie...can't you just go be it somewhere else? I'm really trying to get this Q2 project done. When you prioritize being a zombie over your education, I really just can't even deal with you. I propose a solution. We will automate a process that sends all the zombies in a plane onto a boat into the Doldrums in the sea (I heard that that's a place because Craig told me about it). Then, we'll drop Trump off there. We can even name the boat the Trump Boat. I'm sure he'd love that. So yeah...I mean I'm a problem-solver. That's why I'm here at Galvanize - to learn how to problem-solve. And clearly, all those people who are zombies now only know how to quit. And now they'll never solve any problems because they are the problem.
Lisa out.`,
                user_id: 3,
            }])
        })
}
