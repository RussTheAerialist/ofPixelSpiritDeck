#version 150

uniform vec2 screenSize;
uniform float offset;
uniform float PI;
out vec4 outputColor;

float stroke(float x, float s, float w) {
	float d = step(s, x + w * 0.5) - step(s, x - w * 0.5);
	return clamp(d, 0., 1.);
}

vec2 rationalize() {
	vec2 sq = vec2(screenSize.x, screenSize.x);
	float sqo = (screenSize.y - screenSize.x) / screenSize.y;
	vec2 st = (gl_FragCoord.xy - offset) / sq;
	st.y -= sqo;

	return st;
}

void main() {
	vec2 st = rationalize();

	float color = 0.0;
	float pos = 0.5 + (st.x - st.y) * 0.5;
	color += stroke(pos, .5, .1);

	// color = step(0.5 + cos(st.y * PI) * 0.25, pos);
	outputColor = vec4(color, color, color, 1.0);
}