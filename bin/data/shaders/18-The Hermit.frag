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

float flip(float v, float pct) {
	return mix(v, 1. - v, pct);
}

float triangle(vec2 st) {
	st = (st*2.-1.)*2.;

	return max(
		abs(st.x) * 0.866025 + st.y * 0.5,
		-st.y * 0.5
	);
}

float diamond(vec2 st) {
	st = (st*2.-1.)*2.;

	return max(
		abs(st.x) * 0.866025 + st.y * 0.5,
		abs(st.x) * 0.866025 -st.y * 0.5
	);

}

void main() {
	vec2 st = rationalize();

	float color = 0.0;
	float color2 = 0.0;
	float color3 = 0.0;

	float t = triangle(st);
	float d = diamond(st);

	color += fill(t, .5);
	color -= fill(d, .38);

	outputColor = vec4(color, color, color, 1.0);
}