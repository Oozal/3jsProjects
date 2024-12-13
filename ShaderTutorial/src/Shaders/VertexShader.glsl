uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

attribute vec3 position;
attribute float aRandom;
attribute vec2 uv;

varying vec2 uvVal;
varying float vRandom;

uniform float uTime;

void main()
{
    vec3 objectPos = position;
    objectPos.z += sin(objectPos.x *6.0- uTime*5.0) * 0.3 * uv.x;
    vRandom = aRandom;
    uvVal = uv;
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(objectPos,1.0);

}