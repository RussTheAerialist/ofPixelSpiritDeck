#version 150

uniform vec2 screenSize;
uniform float offset;
out vec4 outputColor;

void main() {
	float windowWidth = screenSize.x;
	float color = 0.0;

	color = step(0.5, (gl_FragCoord.x - offset) / windowWidth);

	outputColor = vec4(color, color, color, 1.0);
}