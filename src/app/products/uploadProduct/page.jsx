"use client";

import React from "react";
import styles from "./upload.module.css";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Plus, ChevronDown, Bold, Italic, Underline, Link as LinkIcon, Code2, MoreHorizontal, Image as ImageIcon, Smile } from "lucide-react";

export default function OrdersPage() {
  
  // basic form state (client-only)
  const [title, setTitle] = React.useState("");
  const [category, setCategory] = React.useState("title");
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState("500.00");
  const [stock, setStock] = React.useState("1,000");
  const [moq, setMoq] = React.useState("50");
  const [unit, setUnit] = React.useState("kg");
  const [status, setStatus] = React.useState("active");
  const [visibility, setVisibility] = React.useState("public");

  // variants
  const [optionName, setOptionName] = React.useState("Weight");
  const [optionInput, setOptionInput] = React.useState("");
  const [optionValues, setOptionValues] = React.useState(["10kg", "50kg", "100kg"]);

  // files
  const [images, setImages] = React.useState([]);
  const [documentName, setDocumentName] = React.useState(null);

  // UX banners
  const [banner, setBanner] = React.useState(null);

  const imageInputRef = React.useRef(null);
  const docInputRef = React.useRef(null);

  function addOption() {
    const trimmed = optionInput.trim();
    if (!trimmed) return;
    if (optionValues.includes(trimmed)) return;
    setOptionValues([...optionValues, trimmed]);
    setOptionInput("");
  }

  function removeOption(value) {
    setOptionValues(optionValues.filter(v => v !== value));
  }

  function onSelectImages(e) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const previews = files.map(f => URL.createObjectURL(f));
    setImages(prev => [...prev, ...previews]);
  }

  function removeImage(url) {
    setImages(prev => prev.filter(u => u !== url));
  }

  function onSelectDoc(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setDocumentName(file.name);
  }

  function validate() {
    if (!title.trim()) return "Please enter a title.";
    if (!category) return "Please select a category.";
    return null;
  }

  function saveDraft() {
    const err = validate();
    if (err) return setBanner({ type: "error", text: err });
    setBanner({ type: "success", text: "Draft saved locally (no backend)." });
  }

  function publish() {
    const err = validate();
    if (err) return setBanner({ type: "error", text: err });
    setBanner({ type: "success", text: "Product published (demo)." });
  }

  function resetForm() {
    setTitle("");
    setCategory("title");
    setDescription("");
    setPrice("500.00");
    setStock("1,000");
    setMoq("50");
    setUnit("kg");
    setStatus("active");
    setVisibility("public");
    setOptionName("Weight");
    setOptionInput("");
    setOptionValues(["10kg", "50kg", "100kg"]);
    setImages([]);
    setDocumentName(null);
    setBanner(null);
  }

  return (
    <div className={styles.wrap}>
      {/* breadcrumb / title */}
      <div className={styles.headerRow}>
        <div className={styles.crumbDot} />
        <span className={styles.crumbText}>Upload product</span>
      </div>

      {/* top grid */}
      <div className={styles.topGrid}>
        {/* left: basic info */}
        <Card className={styles.cardSoft}>
          <CardHeader className={styles.cardHeader}>
            <CardTitle className={styles.sectionTitle}>Basic Info</CardTitle>
          </CardHeader>
          <CardContent className={styles.cardContent}>
            <div className={styles.twoCol}>
              <div className={styles.field}>
                <Label className={styles.label}>Title</Label>
                <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title goes here" className={styles.input} />
              </div>

              <div className={styles.field}>
                <Label className={styles.label}>Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className={`${styles.input} ${styles.selectTrigger}`}>
                    <SelectValue placeholder="Title goes here" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="title">Title goes here</SelectItem>
                    <SelectItem value="catA">Category A</SelectItem>
                    <SelectItem value="catB">Category B</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className={styles.field}>
              <Label className={styles.label}>Description</Label>

              {/* faux toolbar */}
              <div className={styles.toolbar}>
                <div className={styles.toolbarLeft}>
                  <Button variant="ghost" size="sm" className={styles.toolBtnSmall}>
                    <ChevronDown size={16} />
                  </Button>
                  <Separator orientation="vertical" className={styles.toolSep} />
                  <div className={styles.paragraphChip}>
                    Paragraph <ChevronDown size={14} className={styles.paragraphChevron} />
                  </div>
                  <Separator orientation="vertical" className={styles.toolSep} />
                  <Button variant="ghost" size="sm" className={styles.toolBtn}><Bold size={16} /></Button>
                  <Button variant="ghost" size="sm" className={styles.toolBtn}><Italic size={16} /></Button>
                  <Button variant="ghost" size="sm" className={styles.toolBtn}><Underline size={16} /></Button>
                  <Separator orientation="vertical" className={styles.toolSep} />
                  <Button variant="ghost" size="sm" className={styles.toolBtn}><LinkIcon size={16} /></Button>
                  <Button variant="ghost" size="sm" className={styles.toolBtn}><ImageIcon size={16} /></Button>
                  <Button variant="ghost" size="sm" className={styles.toolBtn}><Smile size={16} /></Button>
                  <Separator orientation="vertical" className={styles.toolSep} />
                  <Button variant="ghost" size="sm" className={styles.toolBtn}><MoreHorizontal size={16} /></Button>
                  <Button variant="ghost" size="sm" className={styles.toolBtn}><Code2 size={16} /></Button>
                </div>
              </div>

              <Textarea value={description} onChange={e => setDescription(e.target.value)} className={styles.textarea} placeholder="" />
            </div>
          </CardContent>
        </Card>

        {/* right: visibility & status */}
        <Card className={styles.cardSoft}>
          <CardHeader className={styles.cardHeader}>
            <CardTitle className={styles.sectionTitle}>Visibility &amp; Status</CardTitle>
          </CardHeader>
          <CardContent className={styles.cardContent}>
            <div className={styles.field}>
              <Label className={styles.label}>Status</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className={`${styles.input} ${styles.selectTrigger}`}>
                  <SelectValue placeholder="Active" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className={styles.field}>
              <Label className={styles.label}>Visibility</Label>
              <Select value={visibility} onValueChange={setVisibility}>
                <SelectTrigger className={`${styles.input} ${styles.selectTrigger}`}>
                  <SelectValue placeholder="Public" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">Public</SelectItem>
                  <SelectItem value="private">Private</SelectItem>
                  <SelectItem value="unlisted">Unlisted</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* pricing & inventory */}
      <Card className={styles.cardSoft}>
        <CardHeader className={styles.cardHeader}>
          <CardTitle className={styles.sectionTitle}>Pricing &amp; Inventory</CardTitle>
        </CardHeader>
        
        <CardContent className={styles.cardContent}>
          <div className={styles.twoCol}>
            <div className={styles.field}>
              <Label className={styles.label}>Price per unit</Label>
              <div className={styles.inputWithAffix}>
                <Input value={price} onChange={e => setPrice(e.target.value)} className={styles.input} />
                <div className={styles.affixRight}>PKR</div>
              </div>
            </div>

            <div className={styles.field}>
              <Label className={styles.label}>Available stock</Label>
              <Input value={stock} onChange={e => setStock(e.target.value)} className={styles.input} />
            </div>

            <div className={styles.field}>
              <Label className={styles.label}>MOQ (optional)</Label>
              <Input value={moq} onChange={e => setMoq(e.target.value)} className={styles.input} />
            </div>

            <div className={styles.field}>
              <Label className={styles.label}>Unit type</Label>
              <Select value={unit} onValueChange={setUnit}>
                <SelectTrigger className={`${styles.input} ${styles.selectTrigger}`}>
                  <SelectValue placeholder="kg" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kg">kg</SelectItem>
                  <SelectItem value="g">g</SelectItem>
                  <SelectItem value="lb">lb</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* page-level actions moved to bottom bar */}
        </CardContent>
      </Card>

      {/* variants */}
      <Card className={styles.cardSoft}>
        <CardHeader className={styles.cardHeader}>
          <CardTitle className={styles.sectionTitle}>Variants</CardTitle>
        </CardHeader>
        <CardContent className={styles.cardContent}>
          <div className={styles.twoCol}>
            <div className={styles.field}>
              <Label className={styles.label}>Option name</Label>
              <Input value={optionName} onChange={e => setOptionName(e.target.value)} className={styles.input} />
            </div>

            <div className={styles.field}>
              <Label className={styles.label}>Option Values</Label>
              <div className={styles.optionRow}>
                <div className={styles.chips}>
                  {optionValues.map(v => (
                    <Badge key={v} className={styles.chip}>{v}</Badge>
                  ))}
                </div>
                <div className={styles.optionInputWrap}>
                  <Input value={optionInput} onChange={e => setOptionInput(e.target.value)} placeholder="kg" className={styles.inputSmall} onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); addOption(); } }} />
                  <Button size="icon" className={styles.plusBtn} onClick={addOption}>
                    <Plus size={18} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* images & documents */}
      <Card className={styles.cardSoft}>
        <CardHeader className={styles.cardHeader}>
          <CardTitle className={styles.sectionTitle}>Images &amp; Documents</CardTitle>
        </CardHeader>
        <CardContent className={styles.cardContent}>
          <div className={styles.field}>
            <Label className={styles.label}>Image</Label>
            <div className={styles.dropzone}>
              <div className={styles.dropzoneButtons}>
                <input ref={imageInputRef} type="file" accept="image/*" multiple className={styles.hiddenInput} onChange={onSelectImages} />
                <Button variant="outline" className={styles.btnLight} onClick={() => imageInputRef.current?.click()}>Upload new</Button>
                <Button variant="ghost" className={styles.btnGhost} onClick={() => imageInputRef.current?.click()}>Select existing</Button>
              </div>
            </div>
            {images.length > 0 && (
              <div className={styles.thumbs}>
                {images.map(url => (
                  <div key={url} className={styles.thumb}>
                    <img src={url} alt="preview" className={styles.thumbImg} />
                    <button className={styles.thumbDel} onClick={() => removeImage(url)} aria-label="Remove image">×</button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className={styles.field}>
            <Label className={styles.label}>Safety Document</Label>
            <div className={`${styles.dropzone} ${styles.docZone}`}>
              <span className={styles.docHint}>{documentName || "Upload Document"}</span>
              <input ref={docInputRef} type="file" className={styles.hiddenInput} onChange={onSelectDoc} />
              <Button variant="outline" className={styles.uploadDocBtn} onClick={() => docInputRef.current?.click()}>⬆</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* bottom page actions */}
      <div className={styles.pageActions}>
        <Button variant="ghost" className={styles.btnCancel} onClick={resetForm}>Cancel</Button>
        <div className={styles.actionsRight}>
          <Button variant="outline" className={styles.btnSave} onClick={saveDraft}>Save</Button>
          <Button className={styles.btnPublish} onClick={publish}>Publish</Button>
        </div>
      </div>
      {banner && (
        <div className={`${styles.banner} ${banner.type === "success" ? styles.bannerSuccess : styles.bannerError}`}>
          {banner.text}
        </div>
      )}
    </div>
  );
}

///

///
