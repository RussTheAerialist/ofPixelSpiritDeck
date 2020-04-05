#version 150

uniform vec2 screenSize;
uniform float offset;
uniform float PI;
out vec4 outputColor;

float stroke(float x, float s, float w) {
	float d = step(s, x + w * 0.5) - step(s, x - w * 0.5);
	return clamp(d, 0., 1.);
}

float fill(float x, float s) {
	return 1. - step(s, x);
}

vec2 rationalize() {
	vec2 sq = vec2(screenSize.x, screenSize.x);
	float sqo = (screenSize.y - screenSize.x) / screenSize.y;
	vec2 st = (gl_FragCoord.xy - offset) / sq;
	st.y -= sqo;

	return st;
}

float rect(vec2 st, vec2 s) {
	st = st * 2. - 1.;
	return max(abs(st.x/s.x), abs(st.y/s.y));
}

float flip(float v, float pct) {
	return mix(v, 1. - v, pct);
}

void main() {
	vec2 st = rationalize();

	float color = 0.0;
	float color2 = 0.0;
	float color3 = 0.0;
	float r = rect(st, vec2(.25, .5));
	float d = (st.x + st.y) * 0.5;

	color3 += fill(r, 1.);
	color2 += stroke(d, .5, .01);
	color += flip(color3, color2);

	outputColor = vec4(color, color, color, 1.0);
}