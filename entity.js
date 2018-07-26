/* =========================================================================
 *
 * Entity.js
 *  Definition of our "Entity". Abstractly, an entity is basically an ID. 
 *  Here we implement an entity as a container of data (container of components)
 *
 * ========================================================================= */

ECS = {};
ECS.Components = {};
ECS.Entity = function Entity(){
    // Generate a pseudo random ID
    this.id = (+new Date()).toString(16) + 
        (Math.random() * 100000000 | 0).toString(16) +
        ECS.Entity.prototype._count;

    // increment counter
    ECS.Entity.prototype._count++;

    // The component data will live in this object
    this.components = {};

    return this;
};
// keep track of entities created
ECS.Entity.prototype._count = 0;

ECS.Entity.prototype.addComponent = function addComponent ( component ){
    // Add component data to the entity
    this.components[component.name] = component;
    return this;
};
ECS.Entity.prototype.removeComponent = function removeComponent ( componentName ){
    // Remove component data by removing the reference to it.
    // Allows either a component function or a string of a component name to be
    // passed in
    var name = componentName; // assume a string was passed in

    if(typeof componentName === 'function'){ 
        // get the name from the prototype of the passed component function
        name = componentName.prototype.name;
    }

    delete this.components[name];
    return this;
};

ECS.Entity.prototype.print = function print () {
    // Function to print / log information about the entity
    console.log(JSON.stringify(this, null, 4));
    return this;
};

ECS.Components.Health = function ComponentHealth ( value ){
    value = value || 20;
    this.value = value;

    return this;
};
ECS.Components.Health.prototype.name = 'health';

ECS.systems = {};
ECS.systems.render = function systemRender ( entities ) {
    // Here, we've implemented systems as functions which take in an array of
    // entities. An optimization would be to have some layer which only 
    // feeds in relevant entities to the system, but for demo purposes we'll
    // assume all entities are passed in and iterate over them.

    // This happens each tick, so we need to clear out the previous rendered
    // state
    clearCanvas();

    var curEntity, fillStyle; 

    // iterate over all entities
    for( var entityId in entities ){
        curEntity = entities[entityId];

        // Only run logic if entity has relevant components
        //
        // For rendering, we need appearance and position. Your own render 
        // system would use whatever other components specific for your game
        if( curEntity.components.appearance && curEntity.components.position ){

            // Build up the fill style based on the entity's color data
            fillStyle = 'rgba(' + [
                curEntity.components.appearance.colors.r,
                curEntity.components.appearance.colors.g,
                curEntity.components.appearance.colors.b
            ];

            if(!curEntity.components.collision){
                // If the entity does not have a collision component, give it 
                // some transparency
                fillStyle += ',0.1)';
            } else {
                // Has a collision component
                fillStyle += ',1)';
            }

            ECS.context.fillStyle = fillStyle;

            // Color big squares differently
            if(!curEntity.components.playerControlled &&
            curEntity.components.appearance.size > 12){
                ECS.context.fillStyle = 'rgba(0,0,0,0.8)';
            }

            // draw a little black line around every rect
            ECS.context.strokeStyle = 'rgba(0,0,0,1)';

            // draw the rect
            ECS.context.fillRect( 
                curEntity.components.position.x - curEntity.components.appearance.size,
                curEntity.components.position.y - curEntity.components.appearance.size,
                curEntity.components.appearance.size * 2,
                curEntity.components.appearance.size * 2
            );
            // stroke it
            ECS.context.strokeRect(
                curEntity.components.position.x - curEntity.components.appearance.size,
                curEntity.components.position.y - curEntity.components.appearance.size,
                curEntity.components.appearance.size * 2,
                curEntity.components.appearance.size * 2
            );
        }
    }
};

var e = new ECS.Entity();

e.print();
e.addComponent(new ECS.Components.Health() );


e.print();

