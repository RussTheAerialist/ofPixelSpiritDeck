#version 150

uniform vec2 screenSize;
uniform float offset;
out vec4 outputColor;

void main() {
	vec2 st = (gl_FragCoord.xy - offset) / screenSize;
	float color = step(0.5, st.x + 0.075) - step(0.5, st.x - 0.075);

	outputColor = vec4(color, color, color, 1.0);
}