#!/usr/bin/env python3
from PIL import Image, ImageEnhance, ImageFilter, ImageOps
import glob, os

def center_crop(im, target_ratio=1000/600):
    w,h = im.size
    ar = w/h
    if ar > target_ratio:
        # crop width
        new_w = int(h * target_ratio)
        left = (w - new_w)//2
        im = im.crop((left,0,left+new_w,h))
    else:
        new_h = int(w / target_ratio)
        top = (h - new_h)//2
        im = im.crop((0,top,w,top+new_h))
    return im

def apply_pinterest_style(path, out_path):
    im = Image.open(path).convert('RGB')
    im = center_crop(im)
    im = im.resize((1200,720), Image.LANCZOS)

    # Color & contrast
    im = ImageEnhance.Color(im).enhance(0.9)
    im = ImageEnhance.Contrast(im).enhance(1.12)
    im = ImageEnhance.Brightness(im).enhance(1.03)

    # Warm tone overlay
    overlay = Image.new('RGB', im.size, (255,236,214))
    im = Image.blend(im, overlay, 0.08)

    # Slight vignette
    vign = Image.new('L', im.size, 0)
    for x in range(im.size[0]):
        for y in range(im.size[1]):
            # normalized distance to center
            dx = (x - im.size[0]/2)/(im.size[0]/2)
            dy = (y - im.size[1]/2)/(im.size[1]/2)
            d = (dx*dx + dy*dy)
            val = int(255 * max(0, 1 - d*0.9))
            vign.putpixel((x,y), val)
    im.putalpha(vign)
    bg = Image.new('RGB', im.size, (20,20,20))
    bg.paste(im, mask=im.split()[-1])
    im = bg

    # Gentle sharpen + film grain
    im = im.filter(ImageFilter.UnsharpMask(radius=1, percent=80, threshold=3))
    # add subtle noise
    import random
    px = im.load()
    for i in range(0, im.size[0], 4):
        for j in range(0, im.size[1], 4):
            r,g,b = px[i,j]
            n = random.randint(-6,6)
            px[i,j] = (max(0,min(255,r+n)), max(0,min(255,g+n)), max(0,min(255,b+n)))

    im.save(out_path, quality=92)

def main():
    # process all jpg files in this directory except hero and already-processed
    skip = {'hero-cake.jpg'}
    files = [f for f in glob.glob('*.jpg') if not f.startswith('ai-') and f not in skip]
    print(f"Found {len(files)} images to process")
    for f in files:
        out = 'ai-' + f
        try:
            apply_pinterest_style(f, out)
            print('Processed', f, '->', out)
        except Exception as e:
            print('Error processing', f, e)

if __name__ == '__main__':
    main()
