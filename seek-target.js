AFRAME.registerComponent('seek-target', {
  schema: { 
    target: { 
      type: 'selector',
    },
    distanceDelta: { 
      type: 'number',
      default: 0.025,
    },
    updateDelta: { 
      type: 'number',
      default: 20,
    },
  },
  init: function() {
    this.timeElapsed = 0;
    this.DIRECTION_X = 0;
    this.DIRECTION_Z = 0;
  },
  tick: function(time, timeDelta) {
    this.timeElapsed += timeDelta;
    if (this.timeElapsed > this.data.updateDelta) {
      this.timeElapsed = 0;
      this.changePosition();
    }
  },
  changePosition: function() {
    this.DIRECTION_X = this.getDirectionX();
    this.DIRECTION_Z = this.getDirectionZ()
    this.el.object3D.position.x += this.data.distanceDelta * this.DIRECTION_X;
    this.el.object3D.position.z += this.data.distanceDelta * this.DIRECTION_Z;
  },
  getDirectionX: function() {
    if (this.data.target.object3D.position.x == this.el.object3D.position.x) return 0;
    if (this.data.target.object3D.position.x < this.el.object3D.position.x) return -1;
    if (this.data.target.object3D.position.x > this.el.object3D.position.x) return 1;
  },
  getDirectionZ: function() {
    if (this.data.target.object3D.position.z == this.el.object3D.position.z) return 0;
    if (this.data.target.object3D.position.z < this.el.object3D.position.z) return -1;
    if (this.data.target.object3D.position.z > this.el.object3D.position.z) return 1;
  },

});
