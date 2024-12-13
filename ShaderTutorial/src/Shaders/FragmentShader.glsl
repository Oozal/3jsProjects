precision mediump float;

varying vec2 uvVal;
varying float vRandom;

void main()
{
    gl_FragColor = vec4(uvVal,vRandom,1.0);
}