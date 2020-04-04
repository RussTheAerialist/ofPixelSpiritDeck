#version 150

uniform vec2 screenSize;
uniform float offset;
uniform float PI;
out vec4 outputColor;

void main() {
	vec2 st = (gl_FragCoord.xy - offset) / screenSize;
	float color = 0.0;

	color = step(0.5 + cos(st.y * PI) * 0.25, st.x);

	outputColor = vec4(color, color, color, 1.0);
}