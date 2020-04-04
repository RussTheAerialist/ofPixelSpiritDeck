#version 150

uniform vec2 screenSize;
uniform float offset;
uniform float PI;
out vec4 outputColor;

float stroke(float x, float s, float w) {
	float d = step(s, x + w * 0.5) - step(s, x - w * 0.5);
	return clamp(d, 0., 1.);
}

void main() {
	vec2 st = (gl_FragCoord.xy - offset) / screenSize;
	float color = 0.0;
	float offset = cos(st.y * PI) * .15;
	color += stroke(st.x, .28+offset, .1);
	color += stroke(st.x, .5+offset, .1);
	color += stroke(st.x, .72 + offset, .1);

	// color = step(0.5 + cos(st.y * PI) * 0.25, pos);
	outputColor = vec4(color, color, color, 1.0);
}