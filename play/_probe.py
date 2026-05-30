L = open('index.html', encoding='utf-8').read().split('\n')
def find(sub, start=0):
    for i in range(start, len(L)):
        if sub in L[i]: return i+1
    return -1
js_start = find("COCKPIT SKIN — layout engine")
rail = find("BOTTOM RESTORE RAIL")
out = []
out.append(f"js_start={js_start}")
out.append(f"prevline={L[js_start-2][:55]!r}")
out.append(f"rail={rail}")
for n in range(rail-8, rail):
    out.append(f"{n}: {L[n-1][:62]!r}")
out.append("--- cockpit refs at/after rail ---")
for i in range(rail-1, len(L)):
    if 'ockpit' in L[i].lower():
        out.append(f"{i+1}: {L[i][:70]!r}")
open('_probe_out.txt','w').write('\n'.join(out))
