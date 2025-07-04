export const basicModel = `
[request_definition]
r = sub, obj, act

[policy_definition]
p = sub, obj, act

[policy_effect]
e = some(where (p.eft == allow))

[matchers]
m = (r.sub == p.sub || p.sub == "*") && keyMatch2(r.obj, p.obj) && regexMatch(r.act, p.act)
`;
export const basicPolicy = `g, admin, ADMINISTRADOR`;
