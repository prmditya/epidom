"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Plus, X } from "lucide-react";

interface Ingredient {
  id: string;
  material: string;
  quantity: string;
  unit: string;
}

export default function AddRecipeDialog() {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    prepTime: "",
    cookTime: "",
    yield: "",
    instructions: "",
  });

  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { id: "1", material: "", quantity: "", unit: "" },
  ]);

  const addIngredient = () => {
    setIngredients([
      ...ingredients,
      { id: Date.now().toString(), material: "", quantity: "", unit: "" },
    ]);
  };

  const removeIngredient = (id: string) => {
    if (ingredients.length > 1) {
      setIngredients(ingredients.filter((ing) => ing.id !== id));
    }
  };

  const updateIngredient = (id: string, field: keyof Ingredient, value: string) => {
    setIngredients(ingredients.map((ing) => (ing.id === id ? { ...ing, [field]: value } : ing)));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulate API call
    toast({
      title: "Recipe Created Successfully",
      description: `${formData.name} has been added to your recipe book.`,
    });

    // Reset form
    setFormData({
      name: "",
      category: "",
      prepTime: "",
      cookTime: "",
      yield: "",
      instructions: "",
    });
    setIngredients([{ id: "1", material: "", quantity: "", unit: "" }]);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          Add Recipe
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Create New Recipe</DialogTitle>
          <DialogDescription>
            Create a new recipe with ingredients and instructions.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Recipe Name *</Label>
              <Input
                id="name"
                placeholder="e.g., Classic Baguette, Butter Croissant"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                  required
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bread">Bread</SelectItem>
                    <SelectItem value="pastry">Pastry</SelectItem>
                    <SelectItem value="cake">Cake</SelectItem>
                    <SelectItem value="cookie">Cookie</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="yield">Yield (pieces) *</Label>
                <Input
                  id="yield"
                  type="number"
                  placeholder="12"
                  value={formData.yield}
                  onChange={(e) => setFormData({ ...formData, yield: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="prepTime">Prep Time (min) *</Label>
                <Input
                  id="prepTime"
                  type="number"
                  placeholder="30"
                  value={formData.prepTime}
                  onChange={(e) => setFormData({ ...formData, prepTime: e.target.value })}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="cookTime">Cook Time (min) *</Label>
                <Input
                  id="cookTime"
                  type="number"
                  placeholder="45"
                  value={formData.cookTime}
                  onChange={(e) => setFormData({ ...formData, cookTime: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Ingredients *</Label>
                <Button type="button" size="sm" variant="outline" onClick={addIngredient}>
                  <Plus className="mr-1 h-3 w-3" />
                  Add Ingredient
                </Button>
              </div>

              <div className="max-h-[200px] space-y-2 overflow-y-auto pr-2">
                {ingredients.map((ingredient, index) => (
                  <div key={ingredient.id} className="flex items-start gap-2">
                    <div className="grid flex-1 grid-cols-3 gap-2">
                      <Select
                        value={ingredient.material}
                        onValueChange={(value) =>
                          updateIngredient(ingredient.id, "material", value)
                        }
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Material" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="flour">Flour</SelectItem>
                          <SelectItem value="butter">Butter</SelectItem>
                          <SelectItem value="sugar">Sugar</SelectItem>
                          <SelectItem value="salt">Salt</SelectItem>
                          <SelectItem value="yeast">Yeast</SelectItem>
                          <SelectItem value="milk">Milk</SelectItem>
                          <SelectItem value="eggs">Eggs</SelectItem>
                        </SelectContent>
                      </Select>

                      <Input
                        type="number"
                        placeholder="Qty"
                        value={ingredient.quantity}
                        onChange={(e) =>
                          updateIngredient(ingredient.id, "quantity", e.target.value)
                        }
                        required
                      />

                      <Select
                        value={ingredient.unit}
                        onValueChange={(value) => updateIngredient(ingredient.id, "unit", value)}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Unit" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="kg">kg</SelectItem>
                          <SelectItem value="g">g</SelectItem>
                          <SelectItem value="l">L</SelectItem>
                          <SelectItem value="ml">mL</SelectItem>
                          <SelectItem value="pcs">pcs</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {ingredients.length > 1 && (
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        className="h-9 w-9 shrink-0"
                        onClick={() => removeIngredient(ingredient.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="instructions">Instructions *</Label>
              <Textarea
                id="instructions"
                placeholder="Step-by-step preparation instructions..."
                value={formData.instructions}
                onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                rows={4}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Recipe</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
