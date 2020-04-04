#version 150

uniform vec2 screenSize;
uniform float offset;
out vec4 outputColor;

void main() {
	vec3 color = vec3(1.0);

	outputColor = vec4(color, 1.0);
}