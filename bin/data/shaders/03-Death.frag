#version 150

uniform vec2 screenSize;
uniform float offset;
out vec4 outputColor;

void main() {
	vec2 st = (gl_FragCoord.xy - offset) / screenSize;
	float color = 0.0;

	color = step(1.5 - 2 * st.y, st.x);

	outputColor = vec4(color, color, color, 1.0);
}