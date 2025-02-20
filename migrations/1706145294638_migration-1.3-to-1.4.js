/* eslint-disable camelcase */


exports.shorthands = undefined;

exports.up = pgm => {
    pgm.addColumns('Invoices', {
        observation:{
            type: 'text'
        }
    })
};

// exports.down = pgm => {};
