#!/usr/local/bin/python3
import sys
import urllib.request

fname = sys.argv[1]

with open(fname) as file:
    for website in file.readlines():
        website = website.strip()
        try:
            f = urllib.request.urlopen(website, data=None, timeout=.5)
            iframe = f.info()['X-FRAME-OPTIONS']
            if iframe != 'SAMEORIGIN' and iframe != 'DENY':
                print(website)
        except Exception as e:
            pass
